# HomecareNx

## Generate a page

Run `ng g @ionic/angular-toolkit:page module/pages/my-page --project my-project`

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

## Generate a library

Run `nx workspace-schematic lib my-lib` to generate a complete library with ngrx and components.

Run `ng g @nrwl/angular:lib my-lib` to generate a basic library.

Libraries are shareable across libraries and applications. They can be imported from `@homecare-nx/mylib`.

## Generate a module

Run `nx workspace-schematic app-module --project my-project my-module` to generate a module.

To skip store, run `nx workspace-schematic app-module --project my-project --skipStore my-module` to generate a module.

## Development server

Run `ng serve ionic-jobs` for a dev server. Navigate to http://dev.homecare-jobs.com:8100.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.
