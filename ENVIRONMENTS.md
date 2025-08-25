# Environment Configuration

This document tracks the environment setup, versions, and configuration for the Order of Thekla website project.

## Node.js Environment

- **Node.js Version**: 22.18.0
- **npm Version**: [To be determined after npm install]
- **Package Manager**: npm

## Core Dependencies

### Angular Framework
- **Angular Core**: 20.0.0
- **Angular CLI**: 20.0.0
- **Angular Compiler**: 20.0.0
- **Angular Forms**: 20.0.0
- **Angular Router**: 20.0.0
- **Angular Platform Browser**: 20.0.0

### Ionic Framework
- **Ionic Angular**: 8.0.0
- **Ionic Icons**: 7.0.0
- **Ionic Angular Toolkit**: 12.0.0

### Capacitor (Mobile App Support)
- **Capacitor Core**: 7.4.3
- **Capacitor CLI**: 7.4.3
- **Capacitor App**: 7.0.2
- **Capacitor Haptics**: 7.0.2
- **Capacitor Keyboard**: 7.0.2
- **Capacitor Status Bar**: 7.0.2

### Development Tools
- **TypeScript**: 5.8.0
- **ESLint**: 9.16.0
- **Jasmine**: 5.1.0
- **Karma**: 6.4.0

### Runtime Dependencies
- **RxJS**: 7.8.0
- **Zone.js**: 0.15.0
- **tslib**: 2.3.0

## Environment Files

The following environment files are configured but not tracked in Git:

- `/environments/environment.ts` - Development environment
- `/environments/environment.prod.ts` - Production environment
- `.env` - Local environment variables (if needed)
- `.env.local` - Local development overrides
- `.env.production` - Production environment variables

## Build Configuration

- **Build Tool**: Angular CLI
- **Output Directory**: `/dist`
- **Source Maps**: Enabled for development
- **Cache**: Angular cache enabled
- **Watch Mode**: Available for development builds

## Testing Environment

- **Test Framework**: Jasmine
- **Test Runner**: Karma
- **Coverage**: Available via karma-coverage
- **Browser**: Chrome (headless for CI/CD)

## Linting and Code Quality

- **Linter**: ESLint
- **Angular ESLint**: Enabled with template parsing
- **Rules**: Angular-specific rules and best practices
- **Auto-fix**: Available for many common issues

## Browser Support

- **Target**: Modern browsers (ES2020+)
- **Mobile**: Progressive Web App (PWA) support via Ionic
- **Responsive**: Mobile-first design approach

## Development Workflow

### Local Development
1. `npm install` - Install dependencies
2. `npm start` - Start development server
3. Navigate to `http://localhost:4200`

### Testing
1. `npm test` - Run unit tests
2. `npm run lint` - Check code quality

### Building
1. `npm run build` - Production build
2. `npm run build --watch` - Watch mode for development

## Troubleshooting

### Common Issues
- **Node Version Mismatch**: Ensure Node.js 22.18.0 is installed
- **Dependency Conflicts**: Clear node_modules and package-lock.json, then reinstall
- **Build Errors**: Check TypeScript compilation and Angular CLI version compatibility

### Version Updates
When updating dependencies:
1. Create a new branch
2. Update package.json versions
3. Test thoroughly
4. Document any breaking changes
5. Update this file with new versions

## Notes

- This project uses Angular 20.0.0 which requires Node.js 18.13.0 or later
- Ionic 8.0.0 is compatible with Angular 20.0.0
- Capacitor 7.x provides mobile app capabilities
- All development dependencies are configured for modern development workflows
