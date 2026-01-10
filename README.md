# Web Toolbox

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-green.svg?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Vitest](https://img.shields.io/badge/Vitest-4.0-6E9F18.svg?style=flat-square&logo=vitest)](https://vitest.dev/)
[![Yarn](https://img.shields.io/badge/Yarn-1.22+-2C8EBB.svg?style=flat-square&logo=yarn)](https://yarnpkg.com/)

Open source collection of web developer utilities.
The web application has been deployed and you can use it [just here!](https://amwebexpert.github.io/etoolbox)

<div align="center">
  <img src="public/icon-512x512.png" width="100" alt="Web Toolbox" />
  <div>Like the project? Don't forget to give it a ⭐️!</div>
  <div>Icon made by: <a href="https://therealjerrylow.com/">Jerry Low</a></div>
</div>

## Features

- Ad-Free Experience
  - Developer utilities with zero advertisements, providing a clean and distraction-free environment
- Privacy First
  - All processing happens directly in your browser. No sensitive data is ever sent to external servers, ensuring complete data privacy and security
- Responsive Design
  - Mobile-first approach with full support for smartphones, tablets, and desktop devices for a seamless experience across all platforms
- Industry Best Practices
  - Serve as an exemplary codebase demonstrating optimal coding patterns, clean architecture, and modern development standards for the industry

Some screen captures of the implemented features...

| JSON format                                                 | File encoder                                               | RegEx tester                                              | Imaging OCR                                            |
| ----------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------ |
| <img src="public/screen-captures/JSONFormatter-demo.gif" /> | <img src="public/screen-captures/ImageEncoder-demo.gif" /> | <img src="public/screen-captures/RegexTester-demo.gif" /> | <img src="public/screen-captures/ImageOCR-demo.gif" /> |

## Development commands

| Script                     | Description                                                                             |
| -------------------------- | --------------------------------------------------------------------------------------- |
| `yarn start`               | Alias for `yarn dev` - starts the development server                                    |
| `yarn dev`                 | Starts Vite development server with hot reload                                          |
| `yarn build`               | Builds the production application (cleans dist, generates version, compiles TypeScript) |
| `yarn preview`             | Previews the production build locally (from `dist/`)                                    |
| `yarn githubpage:rebuild`  | Rebuilds the app and moves output to `docs/` for GitHub Pages deployment                |
| `yarn test`                | Runs tests with Vitest                                                                  |
| `yarn lint`                | Runs ESLint on the codebase                                                             |
| `yarn typecheck`           | Runs TypeScript type checking without emitting files                                    |
| `yarn format`              | Formats code with Prettier                                                              |
| `yarn format:check`        | Checks code formatting without making changes                                           |
| `yarn clean:node`          | Removes `node_modules` and `yarn.lock` for a fresh install                              |
| `yarn deploy`              | Deploys the application using the deploy script                                         |
| `yarn generate:version`    | Generates version information file                                                      |
| `yarn generate:api:client` | Generates API client from OpenAPI specification                                         |
| `yarn postinstall`         | Runs after install: applies patches                                                     |

## Roadmap (of next features)

- Excel File reader
- Text diff tooling
- Image compressor
- Mardown viewer
- DataURI scheme viewer (Base64 raw data)
  - Like this website: [Data URL to image](https://base64.guru/tools/data-url-to-image)
- Add list of all official HTTP Server codes (REST)
- Markdown utilities, like [table formatter](https://tabletomarkdown.com/format-markdown-table/)
- Suggests something or add your pull request!

## License

This project is licensed under the MIT license. For more information see [`LICENSE`](./LICENSE) file.

## Contributing & Community Guidelines

We value **technical excellence and human respect equally**. To ensure a welcoming and productive environment for all contributors, please review the following resources:

| Resource                                                                                                                                                       | Description                                                           |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [Code of Conduct](./CODE_OF_CONDUCT.md)                                                                                                                        | Our pledge for a respectful, inclusive, and collaborative environment |
| [Contributing Guide](./CONTRIBUTING.md)                                                                                                                        | How to get started, project conventions, and pull request guidelines  |
| [Coding Guidelines](https://github.com/amwebexpert/chrome-extensions-collection/blob/master/packages/coding-guide-helper/public/markdowns/table-of-content.md) | Best practices for clean, maintainable, and scalable code             |

Adhering to established coding guidelines is essential for developing efficient, maintainable, and scalable software. These guidelines promote consistency across the codebase, making it easier for teams to collaborate and for new developers to understand existing code.
