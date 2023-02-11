// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const mock = true
export const environment = {
  production: false,
  path:mock ? "http://localhost:8080" : "https://alessiopinna-be.herokuapp.com",
  servizio: mock ? "http://localhost:8080/servizio" : "https://alessiopinna-be.herokuapp.com/servizio",
  utente: mock ? "http://localhost:8080" : "https://alessiopinna-be.herokuapp.com",
  acquisto: mock ? "http://localhost:8080/acquisto" : "https://alessiopinna-be.herokuapp.com/acquisto",
  tpl: mock ? "http://localhost:8080/tpl" : "https://alessiopinna-be.herokuapp.com/tpl",
  mock:true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
