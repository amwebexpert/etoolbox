# Development commands and scripts

## Start this front-end app locally

To build a development version and run it locally:

    npm install -g yarn
    yarn
    yarn start

This will compile typescript files and start a local development server listening on port `3000`. The single page application is then available at:

- [http://localhost:3000](http://localhost:3000)

## e2e tests execution

Cypress is used to test the application.

1. open a new terminal and start the app using `yarn start`
1. wait for the app to be available at `http://localhost:3000`
1. open the Cypress `Launchpad` using `yarn run cypress:open`
1. run the `e2e` tests through the Cypress UI
