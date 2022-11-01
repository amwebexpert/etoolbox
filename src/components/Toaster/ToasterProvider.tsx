/**
 * This provider was inspired by looking at this video tutorial:
 *
 * https://www.youtube.com/watch?v=5LrDIWkK_Bc&list=PL_XXwMy-A8KlOsfndUYWUzkp3xR9LNIB8&index=8
 */
import React, { PropsWithChildren } from 'react';

import { AlertColor } from '@mui/material';

import { Toaster } from '.';

// -------------------------------
// Interfaces and types
// -------------------------------
export interface ToasterState {
  open: boolean;
  type: AlertColor;
  message: string;
  autoHideDuration?: number;
}
export type ToasterContextType = {
  toasterState: ToasterState;
};
export type ToasterUpdateContextType = {
  setToasterState: (state: ToasterState) => void;
};
const defaultToasterState: ToasterState = {
  open: false,
  message: '',
  type: 'success',
  autoHideDuration: 4000,
};

// -------------------------------
// Implementation code
// -------------------------------
const ToasterContext = React.createContext<ToasterContextType>({ toasterState: defaultToasterState });
const ToasterUpdateContext = React.createContext<ToasterUpdateContextType>({
  setToasterState: () => {
    console.debug('settings toaster state');
  },
});

export function useToaster() {
  return React.useContext(ToasterContext);
}
export function useToasterUpdate() {
  return React.useContext(ToasterUpdateContext);
}

type ToasterProviderProps = PropsWithChildren<unknown>;

const ToasterProvider: React.FC<ToasterProviderProps> = ({ children }) => {
  const [toasterState, setToasterState] = React.useState<ToasterState>(defaultToasterState);

  React.useEffect(setupIPC, []);

  function setupIPC() {
    // Will be defined if the React App is running inside Electron
    if (window.require) {
      const ipc = window.require('electron').ipcRenderer;
      ipc.on('displayAlertMessage', (_event: unknown, toasterState: ToasterState) => {
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
};

export default ToasterProvider;
