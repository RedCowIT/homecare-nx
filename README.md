# HomecareNx

## Build app

Installing local capacitor-cli via npm for ionic-jobs causes rxjs incompatibility with shared node_modules.
Use global capacitor-cli

##Build

- Update Sentry release in environment.staging and environment.production
- Increment version code and set version string in android/app/build.gradle

<pre>
cd apps/ionic-jobs
npm run build.staging (or npm run build.production)
npx cap open android
</pre>

Update version in gradle
Change Build Variant to stagingDebug or productionDebug
Clean build
Build APK

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

## Icons

To rebuild assets:

Update resources

resources/
├── icon.png
└── splash.png

    cordova-res android --skip-config --copy
