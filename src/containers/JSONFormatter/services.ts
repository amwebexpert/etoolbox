import { saveAs } from 'file-saver';

// Spec http://www.ecma-international.org/ecma-262/6.0/#sec-json.stringify
const replacer = (_key: string, value: any) =>
    value instanceof Object && !(value instanceof Array) ?
        Object.keys(value)
            .sort()
            .reduce((sorted: any, key: string) => {
                sorted[key] = value[key];
                return sorted;
            }, {}) :
        value;

export function formatJson(value?: string): string {
    if (!value) {
        return '';
    }

    try {
        const obj = JSON.parse(value);
        return JSON.stringify(obj, replacer, 4);
    } catch (e) {
        //  do nothing user may still be typing...
        return value;
    }
}

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
