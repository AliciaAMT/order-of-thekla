export const environment = {
  production: false,
  mode: 'dev',
  appName: 'APP_NAME',
  siteUrl: 'https://example.com',
  firebase: {
    apiKey: 'XXX',
    authDomain: 'XXX.firebaseapp.com',
    projectId: 'XXX',
    storageBucket: 'XXX.appspot.com',
    messagingSenderId: 'XXX',
    appId: 'XXX',
    measurementId: 'G-XXXX'
  }
} as const;
