# Getting Started with Order of Thekla

This project was initialized using **@accessiblewebmedia/ionic-angular-init** and is configured with Ionic, Angular, and Firebase.

## Prerequisites
- Node.js 18+
- Ionic CLI: `npm install -g @ionic/cli`
- Firebase CLI: `npm install -g firebase-tools`

## Development
1. Install dependencies: `npm install`
2. Start development server: `npm start`
3. Open browser to `http://localhost:8100`

## Automatic App Configuration
The CLI automatically fixes common app issues:
- **Icons**: Creates favicon.ico, Apple touch icons, and PWA icons to prevent 404 errors
- **Text Selection**: Makes text selectable by default for better user experience
- **Zoom Support**: Enables user zooming in/out of the app/website
- **Touch Optimization**: Improves touch handling and iOS compatibility

## Environment Configuration
The project includes multiple environment configurations:
- **Development**: Uses `src/environments/environment.ts`
- **Production**: Uses `src/environments/environment.prod.ts`
- **Staging**: Uses `src/environments/environment.staging.ts`
- **Staging (Production Build)**: Uses `src/environments/environment.prod.staging.ts`

## Firebase Setup

Firebase is not configured. Run the initializer with `--firebase` flag to set it up.


## Available Scripts
- `npm start` - Development server
- `npm run start:staging` - Staging server
- `npm run build` - Production build
- `npm run build:staging` - Staging build
- `npm run build:prod:staging` - Production-optimized staging build
- `npm test` - Run tests
- `npm run lint` - Lint code

## Version Bump & Deploy Scripts
- `npm run vd` - Patch bump, build, deploy to production
- `npm run fvd` - Feature bump, build, deploy to production
- `npm run mvd` - Major bump, build, deploy to production
- `npm run td` - Build and deploy to staging (no version bump)
