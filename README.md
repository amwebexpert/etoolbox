# Web Toolbox

Open source collection of web developer utilities, also packaged as a desktop application (Windows, Linux, Mac).

![GitHub release (latest by date)](https://img.shields.io/github/v/release/amwebexpert/etoolbox) ![GitHub Release Date](https://img.shields.io/github/release-date/amwebexpert/etoolbox) ![GitHub last commit](https://img.shields.io/github/last-commit/amwebexpert/etoolbox) [![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE) ![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/amwebexpert/etoolbox/react) ![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/amwebexpert/etoolbox/typescript) [![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

<div align="center">
  <img src="public/icon-512x512.png" width="100" alt="Web Toolbox" />
  <div>Icon made by: <a href="https://therealjerrylow.com/">Jerry Low</a></div>
  <div>Powered by <a href="https://reactjs.org/docs/create-a-new-react-app.html">Create React App</a>.</div>
  <div>Like the project? Don't forget to give it a ⭐️!</div>
</div>

## Features

Some screen captures of the implemented features...

| JSON format                                                 | File encoder                                               | RegEx tester                                              | Imaging OCR                                            |
| ----------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------ |
| <img src="public/screen-captures/JSONFormatter-demo.gif" /> | <img src="public/screen-captures/ImageEncoder-demo.gif" /> | <img src="public/screen-captures/RegexTester-demo.gif" /> | <img src="public/screen-captures/ImageOCR-demo.gif" /> |

## Online demo

The web application has been deployed and you can test it [JUST HERE!](https://amwebexpert.github.io/etoolbox). Whenever a feature is only available under `Electron` the UI element will be disabled or a corresponding popup message will be displayed. But most of the time we will try to make the feature available online.

## Tested with Cypress

[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

We have added features coverages (a.k.a. end to end tests) so each release can be tested in order to detect regressions before the release reach the production. [Cypress](https://www.cypress.io/) is an awesome tool and Web Toolbox has a lot of screen behaviors covered!

![image](https://user-images.githubusercontent.com/3459255/200014116-85caa518-9355-443c-b1cd-e67b4f819010.png)

- See the full [e2e tests report](https://amwebexpert.github.io/etoolbox/e2e-tests-report/html/index.html)
- See the full coverage report [Jest & Cypress merged](https://amwebexpert.github.io/etoolbox/all-tests-report/lcov-report/index.html)

## Windows, Linux and MacOS versions

Since most of the features don't need to access desktop capabilities, `Electron` is actually not absolutely required. However, having a desktop application gives nice things like:

- global OS shortcuts
- dedicated OS window
- ability to select exactly where a file will be stored whenever the SPA offers a `Save As…` button
- etc.

Again feel free to try out the [online demo](https://amwebexpert.github.io/etoolbox/) before trying to package the `Electron` app for your platform :-) since you will enjoy:

- live updates
- usage as a progressive web app (PWA)
- or just add bookmark(s) to the specific feature(s) of the app you use the most

Still need an `Electron` release? We've got you covered: [Electron release details](./docs/sections/electron-builds.md)

## Development commands

See all the [Development commands and scripts](./docs/sections/commands.md)

## Project detail

This project is originaly a fork of [React-TypeScript-`Electron` sample with Create React App and `Electron` Builder](https://github.com/yhirose/react-typescript-electron-sample-with-create-react-app-and-electron-builder)

Also bootstrapped with [Create React App](https://github.com/facebook/create-react-app) with `--typescript` option. On the top of it, the following features have been added with relatively small changes:

- TypeScript supports for `Electron` main process source code
- Hot-reload support for `Electron` app
- `Electron` Builder support

More info here: [Web Toolbox Electron app details](./docs/sections/electron-builds.md)

## Roadmap (of next features)

- DataURI scheme viewer (Base64 raw data)
  - Like this website: [Data URL to image](https://base64.guru/tools/data-url-to-image)
- 3D Visualizer (.obj and .fbx viewer)
- Add list of all official HTTP Server codes (REST)
- Markdown utilities, like [table formatter](https://tabletomarkdown.com/format-markdown-table/)
- Suggests something or add your pull request!

## License

This project is licensed under the MIT license. For more information see [`LICENSE`](./LICENSE) file.

## Conventional commits

`CHANGELOG.md` generation powered by [Conventional Commits](https://www.npmjs.com/package/standard-version).

## References

See the [References](./docs/sections/references.md)

## Authors

- [amwebexpert@gmail.com](https://github.com/amwebexpert)
