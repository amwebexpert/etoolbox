import React from "react";
import { Color } from "@material-ui/lab";
import { Toaster } from ".";

// -------------------------------
// Interfaces and types
// -------------------------------
export interface ToasterState {
    open: boolean;
    type: Color;
    message: string;
    autoHideDuration: number;
};
export type ToasterContextType = {
    toasterState: ToasterState;
};
export type ToasterUpdateContextType = {
    setToasterState: (state: ToasterState) => void;
};

// -------------------------------
// Implementation code
// -------------------------------
const ToasterContext = React.createContext<ToasterContextType | null>(null);
const ToasterUpdateContext = React.createContext<ToasterUpdateContextType | null>(null);

export function useToaster() {
    return React.useContext(ToasterContext)!;
}
export function useToasterUpdate() {
    return React.useContext(ToasterUpdateContext)!;
}

const ToasterProvider: React.FC = ({ children }) => {
    const [toasterState, setToasterState] = React.useState<ToasterState>({
        open: false,
        message: '',
        type: 'success',
        autoHideDuration: 4000
    });

    React.useEffect(setupIPC, []);

    function setupIPC() {
        // Will be defined if the React App is running inside Electron
        if (window.require) {
            const ipc = window.require("electron").ipcRenderer;
            ipc.on('displayAlertMessage', (_event: any, toasterState: ToasterState) => {
                setToasterState(toasterState);
            });
        }
    }

    return (
        <ToasterContext.Provider value={{ toasterState }}>
            <ToasterUpdateContext.Provider value={{ setToasterState }}>
                {children}
                <Toaster />
            </ToasterUpdateContext.Provider>
        </ToasterContext.Provider>
    );
}

export default ToasterProvider;
