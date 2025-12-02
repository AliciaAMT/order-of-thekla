# Deployment Guide

This project is configured for deployment to Firebase Hosting with optional CI/CD automation.

## Firebase Hosting Setup


Firebase is not configured. Run the initializer with `--firebase` flag to set up Firebase hosting.


## Environment-Specific Deployments

### Production
- **Build**: `npm run build`
- **Deploy**: `npm run deploy:firebase:prod`
- **URL**: Your production Firebase hosting URL

### Staging
- **Build**: `npm run build:staging`
- **Deploy**: `npm run deploy:firebase:staging`
- **URL**: Your staging Firebase hosting URL

### Staging with Production Build
- **Build**: `npm run build:prod:staging`
- **Deploy**: `npm run deploy:firebase:staging`
- **Use case**: Test production-optimized builds with staging data

## Environment Files Security

**⚠️ IMPORTANT:** Real environment files are excluded from git for security.

- Environment files (`environment.ts`, `environment.prod.ts`) are not committed
- To get Firebase credentials, contact: **admin@accessiblewebmedia.com**
- See `src/environments/README.md` for setup instructions
- See `docs/SECURITY.md` for security guidelines

## Troubleshooting

### Common Issues
1. **Build fails**: 
   - Check that you have created local environment files from examples
   - Verify Firebase credentials are filled in your local `environment.ts` file
   - Ensure you've requested credentials from admin@accessiblewebmedia.com
2. **Deploy fails**: Verify Firebase CLI is logged in and project is selected
3. **Wrong environment**: Ensure you're using the correct build command
4. **Missing credentials**: Contact admin@accessiblewebmedia.com for Firebase configuration

### Firebase CLI Commands
```bash
firebase projects:list          # List available projects
firebase use <project-id>       # Switch to project
firebase target:apply hosting   # Apply hosting targets
firebase hosting:channel:list   # List preview channels
```
