import { app, BrowserWindow, Menu, ipcMain, dialog } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import * as isDev from 'electron-is-dev';
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";

let win: BrowserWindow | null = null;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
  setupMenu();
  setupIpcMain();
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

function createWindow() {
  win = new BrowserWindow({
    title: 'Web Toolbox',
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.on('closed', () => win = null);

  loadApplication();
}

function setupIpcMain() {
  ipcMain.on('rendererAppStarted', () => console.log('main.ts: app started'));
  ipcMain.on('saveJsonAs', (_event, jsonContent: string) => saveJsonAs(jsonContent));
}

function saveJsonAs(jsonContent: string) {
  const documentsFolder = app.getPath('documents');
  const toLocalPath: string = path.resolve(documentsFolder, 'test.json');
  const fullFilename = dialog.showSaveDialogSync(win!, { defaultPath: toLocalPath });
  if (fullFilename) {
    fs.writeFileSync(fullFilename, jsonContent, 'utf-8');
  }
}

function loadApplication() {
  if (!win) {
    return;
  }

  if (isDev) {
    win.loadURL('http://localhost:3000/');
  } else {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  }

  // Hot Reloading
  if (isDev) {
    // 'node_modules/.bin/electronPath'
    require('electron-reload')(__dirname, {
      electron: path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron'),
      forceHardReset: true,
      hardResetMethod: 'exit'
    });
  }

  // DevTools
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
}

function setupMenu() {
  const template: any = [
    {
      label: 'Web Toolbox',
      submenu: [
        {
          label: 'URL Parser',
          accelerator: 'Ctrl+Alt+U',
          click: () => win!.webContents.send('navigateTo', '/URLParser')
        },
        {
          label: 'JSON Formatter',
          accelerator: 'Ctrl+Alt+J',
          click: () => win!.webContents.send('navigateTo', '/JSONFormatter')
        },
        {
          type: 'separator'
        },
        {
          label: 'Refresh',
          accelerator: 'Ctrl+Alt+R',
          click: loadApplication
        },
        {
          label: 'Quit',
          role: 'quit'
        }
      ]
    },
    {
      label: '?',
      submenu: [
        {
          label: 'About...',
          accelerator: 'Ctrl+Alt+A',
          click: () => win!.webContents.send('navigateTo', '/about')
        },
        {
          type: 'separator'
        },
        {
          label: "Dev tools...",
          accelerator: 'Ctrl+Alt+D',
          click: () => {
            win!.webContents.toggleDevTools();
          }
        },
      ]
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
