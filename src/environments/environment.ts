// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBWpIq48WxJvAWDSTEca2qQnt_umVG6ckQ",
    authDomain: "fir-login-photovault.firebaseapp.com",
    databaseURL: "https://fir-login-photovault.firebaseio.com",
    projectId: "fir-login-photovault",
    storageBucket: "fir-login-photovault.appspot.com",
    messagingSenderId: "1036864759904",
    appId: "1:1036864759904:web:d91873a3e3d2fc6947bb05",
    measurementId: "G-1PPQHJBLY6"
  }

  /*contentSecurityPolicy: {
    'default-src': "'none'",
    'script-src': "'self' 'unsafe-inline' 'unsafe-eval'",
    'font-src': "'self' https://fonts.gstatic.com",
    'connect-src': "'self'",
    'img-src': "'self'",
    'report-uri':"'localhost'",
    'style-src': "'self' 'unsafe-inline'",
    'frame-src': "'none'"
  }*/

  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
