import React, { useContext, createContext } from "react";
import { Alert, Color } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

export interface ToasterState {
    open: boolean;
    type: Color;
    message: string;
    autoHideDuration: number;
};
export type ToasterContextType = {
    toasterState: ToasterState;
    setToasterState: (state: ToasterState) => void;
};
export const ToasterContext = createContext<ToasterContextType | null>(null);

export const Toaster: React.FC = () => {
    const { toasterState, setToasterState } = useContext(ToasterContext)!;

    const handleClose = () => {
        setToasterState({ ...toasterState, open: false });
    };

    return (
        <Snackbar
            open={toasterState.open}
            autoHideDuration={toasterState.autoHideDuration}
            onClose={handleClose}
        >
            <Alert
                elevation={6}
                variant="filled"
                onClose={handleClose}
                severity={toasterState.type}
            >
                {toasterState.message}
            </Alert>
        </Snackbar>
    );
}
