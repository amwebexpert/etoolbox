# Web Toolbox Electron app

The following section explains the `Electron` project structure, how to build a new release, and how to run the desktop electron app locally.

## Build desktop releases from source

### Warning

As of `2022-11-07` (and until further notices) the WebToolbox `Electron` build will only be supported up to the `v2.0.9-electron-compatible` app tag. So features added after that tag wont be available as part of `Electron` build. For instance the `cURL converter` feature will only be available online. We have to wait until the following issues get resolved with a stable solution:

- https://stackoverflow.com/questions/70368760/react-uncaught-referenceerror-process-is-not-defined
- https://stackoverflow.com/questions/68085375/cannot-find-module-fs-promises-electron-js

These are essentialy issues raised by the combinaison of:

- `react-scripts` `5.x` releases
- `Electron` builder
- `Node.js`

To build a desktop version just get the latest compabible source code (see `vX.Y.Z-electron-compatible` tag note above) and run the following commands, which will package the installers for all the platforms:

    npm install -g yarn
    npm install
    npm run electron:build:all

This creates the following installers:

- Windows: `build/Web Toolbox Setup <version>.exe`
- Linux: `build/Web Toolbox-<version>.AppImage`
- MacOS: `build/Web Toolbox-<version>.dmg`

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

## Available Scripts in addition to the existing CRA ones

### `yarn run electron:dev`

Runs the `Electron` app in the development mode.

The `Electron` app will reload if you make edits in the `electron` directory.<br>
You will also see any lint errors in the console.

### `yarn run electron:build`

Builds the `Electron` app package for production to the `dist` folder. See also the following script:

    rebuildMacRelease.sh

Your `Electron` app is ready to be distributed!
