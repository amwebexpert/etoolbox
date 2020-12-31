import { app, BrowserWindow, Menu, ipcMain, dialog, Tray, nativeImage, globalShortcut } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import * as isDev from 'electron-is-dev';
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";

const isMac = process.platform === 'darwin';
let win: BrowserWindow | null = null;
let tray: Tray;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
  setupMenu();
  setupIpcMain();
  setupTray();
  setupGlobalShortcuts();
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

function createWindow() {
  win = new BrowserWindow({
    title: app.name,
    width: 1200,
    height: 900,
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
      label: app.name,
      submenu: [
        {
          label: 'URL Parser',
          accelerator: 'Ctrl+Alt+U',
          click: () => win!.webContents.send('navigateTo', '/URLParser')
        },
        {
          label: 'URL Encoder/decoder',
          accelerator: 'Ctrl+Alt+R',
          click: () => win!.webContents.send('navigateTo', '/URLEncoder')
        },
        {
          label: 'Base64 Encoder/decoder',
          accelerator: 'Ctrl+Alt+B',
          click: () => win!.webContents.send('navigateTo', '/Base64Encoder')
        },
        {
          label: 'Base64 Image encoder',
          accelerator: 'Ctrl+Alt+I',
          click: () => win!.webContents.send('navigateTo', '/Base64ImageEncoder')
        },
        {
          label: 'JSON Formatter',
          accelerator: 'Ctrl+Alt+J',
          click: () => win!.webContents.send('navigateTo', '/JSONFormatter')
        },
        {
          label: 'Regular expression tester',
          accelerator: 'Ctrl+Alt+X',
          click: () => win!.webContents.send('navigateTo', '/RegExTester')
        },
        {
          label: 'UUID Generator',
          accelerator: 'Ctrl+Alt+D',
          click: () => win!.webContents.send('navigateTo', '/UUIDGenerator')
        },
        {
          label: 'JWT Decoder',
          accelerator: 'Ctrl+Alt+T',
          click: () => win!.webContents.send('navigateTo', '/JWTDecoder')
        },
        {
          label: 'Image OCR (text extract)',
          accelerator: 'Ctrl+Alt+O',
          click: () => win!.webContents.send('navigateTo', '/ImageOCR')
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
    // { role: 'editMenu' }
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ]
    }, {
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

function setupTray() {
  const template: any = [
    {
      label: 'About...',
      click: () => {
        win!.show();
        win!.webContents.send('navigateTo', '/about');
      }
    },
    {
      type: 'separator'
    },
    {
      label: "Dev tools...",
      click: () => {
        win!.show();
        win!.webContents.toggleDevTools();
      }
    }
  ];

  if (tray) {
    tray.destroy();
  }

  tray = new Tray(createTrayIcon());
  tray.setContextMenu(Menu.buildFromTemplate(template));
  tray.setToolTip(`${app.name}...`);
  if (isMac) {
    // Since I was not able to make tray icon showing on MacOS :-/
    // at least this is displaying clickable title
    tray.setTitle('WTbox');
  }
}

function createTrayIcon() {
  const ext = isMac ? 'icns' : 'png';
  const appIconPath: string = path.join(__dirname, '..', `icon.${ext}`);
  console.log('Application icon', appIconPath);
  console.log('Application icon EXIST?', fs.existsSync(appIconPath));
  const img = nativeImage.createFromPath(appIconPath);
  const trayIcon = img.resize({ width: 24, height: 24 });

  return trayIcon;
}

function setupGlobalShortcuts() {
  globalShortcut.register('Alt+1', () => win!.show());
}

function setupIpcMain() {
  ipcMain.on('rendererAppStarted', () => console.log('main.ts: app started'));
  ipcMain.on('saveJsonAs', (_event, jsonContent: string) => saveJsonAs(jsonContent));
}

function saveJsonAs(jsonContent: string) {
  const documentsFolder = app.getPath('documents');
  const toLocalPath: string = path.resolve(documentsFolder, 'test.json');

  dialog.showSaveDialog(win!, { defaultPath: toLocalPath }).then((result) => {
    const fullFilename: string | undefined = result.filePath;
    if (fullFilename) {
      fs.writeFile(fullFilename, jsonContent, 'utf-8', (err) => {
        win!.webContents.send('displayAlertMessage', {
          open: true,
          message: `File saved successfully: [${fullFilename}]`,
          type: 'success',
          autoHideDuration: 4000
        });
      });
    }
  });
}
