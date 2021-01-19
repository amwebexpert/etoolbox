/**
 * This provider was inspired by looking at this video tutorial:
 * 
 * https://www.youtube.com/watch?v=5LrDIWkK_Bc&list=PL_XXwMy-A8KlOsfndUYWUzkp3xR9LNIB8&index=8
 */
import React from "react";
import { GlobalSpinner } from "./GlobalSpinner";

// -------------------------------
// Interfaces and types
// -------------------------------
export interface GlobalSpinnerState {
    open: boolean;
};
export type GlobalSpinnerContextType = {
    globalSpinnerState: GlobalSpinnerState;
};
export type GlobalSpinnerUpdateContextType = {
    setGlobalSpinnerState: (state: GlobalSpinnerState) => void;
};

// -------------------------------
// Implementation code
// -------------------------------
const SpinnerContext = React.createContext<GlobalSpinnerContextType | null>(null);
const SpinnerUpdateContext = React.createContext<GlobalSpinnerUpdateContextType | null>(null);

export function useGlobalSpinner() {
    return React.useContext(SpinnerContext)!;
}
export function useGlobalSpinnerUpdate() {
    return React.useContext(SpinnerUpdateContext)!;
}

const GlobalSpinnerProvider: React.FC = ({ children }) => {
    const [globalSpinnerState, setGlobalSpinnerState] = React.useState<GlobalSpinnerState>({ open: false });

    return (
        <SpinnerContext.Provider value={{ globalSpinnerState }}>
            <SpinnerUpdateContext.Provider value={{ setGlobalSpinnerState }}>
                <GlobalSpinner>
                    {children}
                </GlobalSpinner>
            </SpinnerUpdateContext.Provider>
        </SpinnerContext.Provider>
    );
}

export default GlobalSpinnerProvider;
