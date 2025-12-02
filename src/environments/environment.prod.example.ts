/**
 * PRODUCTION ENVIRONMENT TEMPLATE FILE
 * 
 * This is a TEMPLATE only. Do not commit real credentials.
 * 
 * To get Firebase credentials, contact: admin@accessiblewebmedia.com
 * 
 * Copy this file to environment.prod.ts and fill in your actual Firebase configuration.
 * See src/environments/README.md for setup instructions.
 */

export const environment = {
  production: true,
  mode: 'prod',
  appName: 'Order of Thekla',
  siteUrl: 'OrderOfThekla.org',
  firebase: {
    apiKey: 'YOUR_FIREBASE_API_KEY',
    authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_PROJECT_ID.appspot.com',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
    measurementId: 'G-YOUR_MEASUREMENT_ID'
  }
} as const;
