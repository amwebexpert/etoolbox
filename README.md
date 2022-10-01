# Web Toolbox

Open source collection of web developer utilities, also packaged as a desktop application

![GitHub release (latest by date)](https://img.shields.io/github/v/release/amwebexpert/etoolbox) ![GitHub Release Date](https://img.shields.io/github/release-date/amwebexpert/etoolbox) ![GitHub last commit](https://img.shields.io/github/last-commit/amwebexpert/etoolbox) [![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE) ![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/amwebexpert/etoolbox/react) ![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/amwebexpert/etoolbox/typescript) ![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/amwebexpert/etoolbox/@material-ui/core)


<div align="center">
  <img src="public/icon-512x512.png" width="100" alt="Web Toolbox" />
  <div>Icon made by: <a href="https://therealjerrylow.com/">Jerry Low</a></div>
  <div>Powered by <a href="https://reactjs.org/docs/create-a-new-react-app.html">Create React App</a>.</div>
  <div>Like the project? Don't forget to give it a ⭐️!</div>
</div>


## Features

Some screen captures of the implemented features...

JSON format | File encoder | RegEx tester | Imaging OCR
----------- | ------------ | ------------ | -----------
<img src="public/screen-captures/JSONFormatter-demo.gif" /> | <img src="public/screen-captures/ImageEncoder-demo.gif" /> | <img src="public/screen-captures/RegexTester-demo.gif" /> | <img src="public/screen-captures/ImageOCR-demo.gif" />

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

### Build desktop releases from source

To build a desktop version just get the source code and run the following command, which will package the installers for all the platforms:

    npm install -g yarn
    npm install
    npm run electron:build:all

This creates the following installers:

* Windows: `build/Web Toolbox Setup <version>.exe`
* Linux: `build/Web Toolbox-<version>.AppImage`
* MacOS: `build/Web Toolbox-<version>.dmg`


### Start the app locally

To build a development version and run it locally:

    npm install -g yarn
    yarn
    yarn start

This compiles typescript files and start a local web server. This application is then available at:

- [http://localhost:3000/#/PokerPlanning](http://localhost:3000/#/PokerPlanning)


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

Builds the `Electron` app package for production to the `dist` folder. See also the following script:

    rebuildMacRelease.sh

Your `Electron` app is ready to be distributed!

#### `yarn run release`

CHANGELOG generation powered by [Conventional Commits](https://www.npmjs.com/package/standard-version).

## Roadmap (of next features)

- Code snippets online store with text search capabilities on keywords and programming language type
- CSV Viewer, see this [nice wrapper for displaying CSV data in a formatted table](https://github.com/phaniteja1/react-csv-viewer/blob/master/src/CsvInterface.js)
- Suggests something or add your pull request!
- Add list of all official HTTP Server codes (REST)

## License

This project is licensed under the MIT license. For more information see [`LICENSE`](./LICENSE) file.

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
  
