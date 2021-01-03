<div align="center">
  <img src="public/icon-512x512.png" width="200" alt="Web Toolbox" />
  <div>Code author: <a href="mailto:amwebexpert@gmail.com">amwebexpert@gmail.com</a></div>
  <div>Icon made by: <a href="https://therealjerrylow.com/">Jerry Low</a></div>
</div>

<br />

<div align="center"><strong>Web Toolbox</strong></div>
<div align="center">Collection of web developer utilities</div>

<br />

<div align="center">
  <sub>Powered by <a href="https://reactjs.org/docs/create-a-new-react-app.html">Create React App</a>.</sub>
</div>

## Features

Some screen captures of the implemented features...

<div align="center">
  <img src="public/screen-captures/JSONFormatter-demo.gif" />
  <img src="public/screen-captures/ImageEncoder-demo.gif" />
  <img src="public/screen-captures/RegexTester-demo.gif" />
  <img src="public/screen-captures/ImageOCR-demo.gif" />
</div>

## Online demo

The app has been deployed and you can test it right [here](https://amwebexpert.github.io/etoolbox/index.html).

## Windows, Linux and MacOS versions

Since 95% of the features do not require desktop capabilities, Electron is actually not really required. However having a desktop application gives nice things like global OS shortcuts and a dedicated OS window.

Again feel free to try ot the online [demo](https://amwebexpert.github.io/etoolbox/) before trying to package the Electron app for your platform :-)

### Builded releases

The following installers are available under `releases` folder:

* Windows: `releases/Web Toolbox Setup <version>.exe`
* Linux: `releases/Web Toolbox-<version>.AppImage`
* MacOS: `releases/Web Toolbox-<version>.dmg`

### Build releases from source

To build a desktop version just get the source code and run the following command, which will package the installers for all the platforms:

    npm install -g yarn
    npm install
    npm run electron:build:all

This creates the following installers:

* Windows: `build/Web Toolbox Setup <version>.exe`
* Linux: `build/Web Toolbox-<version>.AppImage`
* MacOS: `build/Web Toolbox-<version>.dmg`

## License

This project is licensed under the MIT license, Copyright (c) 2020 André Masson. For more information see `LICENSE.md`.

## Usefull links

* https://github.com/electron/electron/issues/7300
* https://stackoverflow.com/questions/41551110/unable-to-override-app-name-on-mac-os-electron-menu
* https://apple.stackexchange.com/a/385074/364767
* https://www.electron.build/icons
* https://cloudconvert.com/png-to-icns
* https://stackoverflow.com/a/8684009/704681
* https://stackoverflow.com/a/52409047/704681
* https://omakoleg.gitlab.io/posts/spa-image-base64-react/



React-TypeScript-Electron sample with Create React App and Electron Builder
===========================================================================

* https://github.com/yhirose/react-typescript-electron-sample-with-create-react-app-and-electron-builder

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) with `--typescript`option.

On the top of it, the following features have been added with realatively small changes:

* TypeScript supports for Electron main process source code
* Hot-reload support for Electron app
* Electron Bulder support

## Available Scripts in addition to the existing ones

### `npm run electron:dev`

Runs the Electron app in the development mode.

The Electron app will reload if you make edits in the `electron` directory.<br>
You will also see any lint errors in the console.

### `npm run electron:build`

Builds the Electron app package for production to the `dist` folder.

Your Electron app is ready to be distributed!

## Project directory structure

```bash
my-app/
├── package.json
│
## render process
├── tsconfig.json
├── public/
├── src/
│
## main process
├── electron/
│   ├── main.ts
│   └── tsconfig.json
│
## build output
├── build/
│   ├── index.html
│   ├── static/
│   │   ├── css/
│   │   └── js/
│   │
│   └── electron/
│      └── main.js
│
## distribution packges
└── dist/
    ├── mac/
    │   └── my-app.app
    └── my-app-0.1.0.dmg
```

## Do it yourself from scratch

### Generate a React project and install npm dependencies

```bash
create-react-app my-app --typescript
cd my-app
yarn add @types/electron-devtools-installer electron-devtools-installer electron-is-dev electron-reload
yarn add -D concurrently electron electron-builder wait-on
```

### Make Electon main process source file

#### electron/tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "sourceMap": true,
    "strict": true,
    "outDir": "../build", # Output transpiled files to build/electron/
    "rootDir": "../",
    "noEmitOnError": true,
    "typeRoots": [
      "node_modules/@types"
    ]
  }
}
```

#### electron/main.ts

```ts
import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as isDev from 'electron-is-dev';
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  if (isDev) {
    win.loadURL('http://localhost:3000/index.html');
  } else {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  }

  win.on('closed', () => win = null);

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

  if (isDev) {
    win.webContents.openDevTools();
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
```

### Adjust package.json

#### Add properties for Electron

```json
  "homepage": ".", # see https://create-react-app.dev/docs/deployment#serving-the-same-build-from-different-paths
  "main": "build/electron/main.js",
```

#### Add properties for Electron Builder

```json
  "author": "Your Name",
  "description": "React-TypeScript-Electron sample with Create React App and Electron Builder",
  ...
  "build": {
    "extends": null, # see https://github.com/electron-userland/electron-builder/issues/2030#issuecomment-386720420
    "files": [
      "build/**/*"
    ],
    "directories": {
      "buildResources": "assets" # change the resource directory from 'build' to 'assets'
    }
  },
```

#### Add scripts

```json
  "scripts": {
    "postinstall": "electron-builder install-app-deps",
    "electron:dev": "concurrently \"BROWSER=none yarn start\" \"wait-on http://localhost:3000 && tsc -p electron -w\" \"wait-on http://localhost:3000 && tsc -p electron && electron .\"",
    "electron:build": "yarn build && tsc -p electron && electron-builder",
```

## Many thanks to the following articles!

- [⚡️ From React to an Electron app ready for production](https://medium.com/@kitze/%EF%B8%8F-from-react-to-an-electron-app-ready-for-production-a0468ecb1da3)
- [How to build an Electron app using Create React App and Electron Builder](https://www.codementor.io/randyfindley/how-to-build-an-electron-app-using-create-react-app-and-electron-builder-ss1k0sfer)
- [Application entry file reset to default (react-cra detected and config changed incorrectly)](https://github.com/electron-userland/electron-builder/issues/2030)
- [Serving the Same Build from Different Paths](https://create-react-app.dev/docs/deployment#serving-the-same-build-from-different-paths)

## 
