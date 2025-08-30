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

## Troubleshooting

### Common Issues
1. **Build fails**: Check environment files for missing Firebase keys
2. **Deploy fails**: Verify Firebase CLI is logged in and project is selected
3. **Wrong environment**: Ensure you're using the correct build command

### Firebase CLI Commands
```bash
firebase projects:list          # List available projects
firebase use <project-id>       # Switch to project
firebase target:apply hosting   # Apply hosting targets
firebase hosting:channel:list   # List preview channels
```
