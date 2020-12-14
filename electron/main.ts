import { app, BrowserWindow, Menu } from 'electron';
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
    width: 1200,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.on('closed', () => win = null);

  loadApplication();
}

function loadApplication() {
  if (!win) {
    return;
  }

  if (isDev) {
    win.loadURL('http://localhost:3000/index.html');
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
  console.log('Calling setApplicationMenu...');
  let menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'Refresh',
          accelerator: 'Ctrl+Alt+R',
          click: loadApplication
        },
        {
          type: 'separator'
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
          click: () => {
            console.log('Navigation to about page');
            // mainWindow.webContents.send('navigateTo', 'about');
          }
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

  ]);

  Menu.setApplicationMenu(menu);
}
