# Environment Configuration

## ⚠️ SECURITY NOTICE

**DO NOT COMMIT REAL FIREBASE CREDENTIALS TO GIT**

The actual environment files (`environment.ts`, `environment.prod.ts`, etc.) are excluded from version control for security reasons. Only example/template files are committed to the repository.

## Getting Firebase Credentials

To obtain the Firebase configuration credentials, please contact:

**Email:** admin@accessiblewebmedia.com

Include in your request:
- Your name and role
- Why you need access to the credentials
- Which environment you need (development, staging, or production)

## Available Environment Files

### Template Files (Safe to Commit)
- `environment.example.ts` - Template for development environment
- `environment.prod.example.ts` - Template for production environment

### Real Files (Never Commit - Git Ignored)
- `environment.ts` - Development environment (local use only)
- `environment.prod.ts` - Production environment (local use only)
- `environment.staging.ts` - Staging environment (if used)
- `environment.prod.staging.ts` - Staging production build (if used)

## Setup Instructions

1. **Copy the example file** to create your real environment file:
   ```bash
   cp src/environments/environment.example.ts src/environments/environment.ts
   cp src/environments/environment.prod.example.ts src/environments/environment.prod.ts
   ```

2. **Request credentials** from admin@accessiblewebmedia.com

3. **Fill in the Firebase configuration** in your local environment files:
   ```typescript
   export const environment = {
     production: false,
     mode: 'dev',
     appName: 'Order of Thekla',
     siteUrl: 'OrderOfThekla.org',
     firebase: {
       apiKey: 'YOUR_API_KEY',
       authDomain: 'YOUR_AUTH_DOMAIN',
       projectId: 'YOUR_PROJECT_ID',
       storageBucket: 'YOUR_STORAGE_BUCKET',
       messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
       appId: 'YOUR_APP_ID',
       measurementId: 'YOUR_MEASUREMENT_ID'
     }
   } as const;
   ```

4. **Never commit** these files - they are automatically excluded by `.gitignore`

## Environment Files Structure

Each environment file should export a constant object with:
- `production`: boolean - Whether this is a production build
- `mode`: string - Environment mode ('dev', 'prod', 'staging')
- `appName`: string - Application name
- `siteUrl`: string - Site URL
- `firebase`: object - Firebase configuration object

## Verification

To verify your environment files are properly ignored:
```bash
git status
```

The real environment files should NOT appear in the git status output.

## Troubleshooting

If you see environment files in `git status`:
1. They may have been committed before being added to `.gitignore`
2. Remove them from git tracking: `git rm --cached src/environments/environment.ts`
3. Commit the removal: `git commit -m "Remove environment files from tracking"`

---

**Remember:** Real credentials should never be in version control. Always use the example files as templates and request actual credentials from the administrator.

