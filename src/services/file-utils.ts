import { saveAs } from 'file-saver';

export function saveJsonAs(jsonContent: string): void {
    // Will be defined if the React App is running inside Electron
    if (window.require) {
        const ipc = window.require("electron").ipcRenderer;
        ipc.send('saveJsonAs', jsonContent);
    } else {
        var blob = new Blob([jsonContent], { type: 'application/json' });
        saveAs(blob, 'data.json');
    }
}
