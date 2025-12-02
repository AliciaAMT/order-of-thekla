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

### ⚠️ Security Notice

**Real environment files are excluded from git for security.** Only template files are committed.

### Setting Up Environment Files

1. **Copy the example files** to create your local environment files:
   ```bash
   cp src/environments/environment.example.ts src/environments/environment.ts
   cp src/environments/environment.prod.example.ts src/environments/environment.prod.ts
   ```

2. **Get Firebase credentials** by contacting: **admin@accessiblewebmedia.com**

3. **Fill in your Firebase configuration** in the local environment files

4. **Never commit** these files - they are automatically excluded by `.gitignore`

See `src/environments/README.md` for detailed setup instructions.

### Available Environment Configurations

- **Development**: Uses `src/environments/environment.ts` (not in git)
- **Production**: Uses `src/environments/environment.prod.ts` (not in git)
- **Staging**: Uses `src/environments/environment.staging.ts` (not in git, if used)
- **Staging (Production Build)**: Uses `src/environments/environment.prod.staging.ts` (not in git, if used)

### Template Files (Safe to Commit)

- `src/environments/environment.example.ts` - Development template
- `src/environments/environment.prod.example.ts` - Production template

## Firebase Setup

Firebase configuration is required for authentication and database features.

**To get Firebase credentials:**
- Contact: **admin@accessiblewebmedia.com**
- Include your name, role, and which environment you need

Once you have credentials, add them to your local `environment.ts` file (never commit this file).

For more information, see:
- `src/environments/README.md` - Environment setup guide
- `docs/SECURITY.md` - Security guidelines


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
