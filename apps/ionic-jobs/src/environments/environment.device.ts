// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
    domain: 'staging-laravel.homecareservicecentre.co.uk:8443',
    baseUrl: 'https://staging-laravel.homecareservicecentre.co.uk:8443/',
    timeout: 10
  },
  auth: {
    domain: 'homecaresc-dev.eu.auth0.com',
    loginUrl: '',
    clientId: 'iTkfQ2iU0PL7RUyKI8Dp2XCopmgsevJ6',
    redirectUri: 'https://homecareservicecentre.com/main',
    logoutUri: 'https://homecareservicecentre.com/logout-success',
    audience: 'http://homecare-job-api.test',
  },
  debug: {
    forceDevice: false
  },
  logHandlers: [
    {
      type: 'serialized-console',
      key: 'console',
      enabled: true,
      level: 'trace',
      prefix: '[jobs]'
    }
  ],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
