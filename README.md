# Web Toolbox

Collection of web developer utilities

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

The app has been deployed and you can test it [right here!](https://amwebexpert.github.io/etoolbox). Whenever a feature is only available under `Electron` the UI element will be disabled or a corresponding popup message will be displayed. But most of the time we will try to make the feature available online.

## Windows, Linux and MacOS versions

Since most of the features don't need to access desktop capabilities, `Electron` is actually not absolutely required. However, having a desktop application gives nice things like:

- global OS shortcuts
- dedicated OS window
- ability to select exactly where a file will be stored whenever the SPA offers a `Save As...` button
- etc.

Again feel free to try out the [online demo](https://amwebexpert.github.io/etoolbox/) before trying to package the `Electron` app for your platform :-) since you will enjoy:

- live updates
- usage as a progressive web app (PWA)
- or just add bookmark(s) to the specific feature(s) of the app you use the most

### Builded desktop releases

The following installers (may be old release in some cases) are available under `releases` folder:

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


## Project detail

This project is originaly a fork of [React-TypeScript-`Electron` sample with Create React App and `Electron` Builder](https://github.com/yhirose/react-typescript-electron-sample-with-create-react-app-and-electron-builder)

Also bootstrapped with [Create React App](https://github.com/facebook/create-react-app) with `--typescript` option. On the top of it, the following features have been added with relatively small changes:

* TypeScript supports for `Electron` main process source code
* Hot-reload support for `Electron` app
* `Electron` Builder support

### Project directory structure

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

### Available Scripts in addition to the existing CRA ones

#### `yarn run electron:dev`

Runs the `Electron` app in the development mode.

The `Electron` app will reload if you make edits in the `electron` directory.<br>
You will also see any lint errors in the console.

#### `yarn run electron:build`

Builds the `Electron` app package for production to the `dist` folder.

Your `Electron` app is ready to be distributed!

#### `yarn run release`

CHANGELOG generation powered by Conventional Commits. Detail here: https://www.npmjs.com/package/standard-version

## Roadmap (of next features)

- CSV Viewer, see this [nice wrapper for displaying CSV data in a formatted table](https://github.com/phaniteja1/react-csv-viewer/blob/master/src/CsvInterface.js)
- Code snippets online store with text search capabilities on keywords and programming language type
- Suggests something or add your pull request!

## License

This project is licensed under the MIT license. For more information see `LICENSE.md`.

## Useful links

* https://github.com/electron/electron/issues/7300
* https://askubuntu.com/a/935249/990301 (to setup *.AppImage in Ubuntu and make it auto discoverable inside your ~/.local/bin/ folder)
* https://stackoverflow.com/questions/41551110/unable-to-override-app-name-on-mac-os-electron-menu
* https://apple.stackexchange.com/a/385074/364767
* https://www.electron.build/icons
* https://cloudconvert.com/png-to-icns
* https://stackoverflow.com/a/8684009/704681
* https://stackoverflow.com/a/52409047/704681

### react-router-dom

* https://medium.com/swlh/defining-nested-routes-with-react-router-8f140e87b360

### Interesting posts this app has been inspired by

* https://omakoleg.gitlab.io/posts/spa-image-base64-react/
* https://stackoverflow.com/questions/53028778/how-to-show-build-datetime-on-my-react-web-app-using-create-react-app


### Spinner

* https://www.npmjs.com/package/react-loading-overlay
* https://www.npmjs.com/package/react-spinners
* https://www.davidhu.io/react-spinners/


## Authors

- [amwebexpert@gmail.com](https://github.com/amwebexpert)
  
