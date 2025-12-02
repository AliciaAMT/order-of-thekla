# Development Guide

This document provides comprehensive guidance for setting up and working with the Order of Thekla website project during development.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Development Environment](#development-environment)
- [Development Workflow](#development-workflow)
- [Code Quality Tools](#code-quality-tools)
- [Testing](#testing)
- [Building](#building)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

## Prerequisites

### Required Software

- **Node.js**: Version 22.18.0 (LTS)
- **npm**: Comes with Node.js (version 10+ recommended)
- **Git**: Version 2.30+ recommended
- **Code Editor**: VS Code, WebStorm, or similar

### Node.js Installation

#### Windows
1. Download from [nodejs.org](https://nodejs.org/)
2. Run the installer
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

#### macOS
```bash
# Using Homebrew
brew install node@22

# Or download from nodejs.org
```

#### Linux
```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Or using nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 22.18.0
nvm use 22.18.0
```

### Git Installation

#### Windows
1. Download from [git-scm.com](https://git-scm.com/)
2. Run the installer
3. Configure Git:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

#### macOS/Linux
```bash
# macOS
brew install git

# Linux
sudo apt-get install git
```

## Initial Setup

### 1. Clone the Repository

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/order-of-thekla.git
cd order-of-thekla

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/order-of-thekla.git
```

### 2. Install Dependencies

```bash
# Install all dependencies
npm install

# Verify installation
npm list --depth=0
```

### 3. Environment Configuration

**⚠️ Security:** Real environment files are excluded from git. Only templates are committed.

```bash
# Copy example files to create your local environment files
cp src/environments/environment.example.ts src/environments/environment.ts
cp src/environments/environment.prod.example.ts src/environments/environment.prod.ts
```

**Getting Firebase Credentials:**
- Contact: **admin@accessiblewebmedia.com**
- Include: Your name, role, and which environment you need

Once you have credentials, fill them in your local `environment.ts` file (never commit this file).

See `src/environments/README.md` for detailed setup instructions.

### 4. Verify Setup

```bash
# Check if everything works
npm start
npm test
npm run lint
```

## Development Environment

### IDE Setup

#### VS Code (Recommended)

Install these extensions:
- **Angular Language Service**
- **Ionic Snippets**
- **ESLint**
- **Prettier**
- **GitLens**
- **Auto Rename Tag**
- **Bracket Pair Colorizer**

#### WebStorm

- Enable Angular support
- Configure ESLint integration
- Set up Git integration

### Browser Extensions

- **Angular DevTools**
- **Redux DevTools** (if using state management)
- **React Developer Tools** (if using React components)

### Terminal Setup

#### Windows (Git Bash)
```bash
# Add to .bashrc
export PATH="/c/Program Files/nodejs:$PATH"
alias npm="npm.cmd"
```

#### macOS/Linux
```bash
# Add to .bashrc or .zshrc
export PATH="/usr/local/bin:$PATH"
```

## Development Workflow

### 1. Daily Workflow

```bash
# Start of day
git checkout main
git pull upstream main
git checkout -b feature/your-feature-name

# During development
npm start  # In one terminal
npm test   # In another terminal (watch mode)

# End of day
git add .
git commit -m "feat(feature): description of changes"
git push origin feature/your-feature-name
```

### 2. Feature Development

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and test
npm test
npm run lint

# Commit changes
git add .
git commit -m "feat(feature): add new functionality"

# Push and create PR
git push origin feature/feature-name
```

### 3. Code Review Process

1. **Self-review** your code
2. **Run all tests** locally
3. **Check linting** rules
4. **Update documentation** if needed
5. **Create pull request**
6. **Address feedback** from reviewers

### 4. Merging and Deployment

```bash
# After PR approval
git checkout main
git pull upstream main
git merge feature/feature-name
git push origin main

# Clean up
git branch -d feature/feature-name
git push origin --delete feature/feature-name
```

## Code Quality Tools

### ESLint Configuration

The project uses ESLint with Angular-specific rules:

```bash
# Run linting
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix

# Check specific files
npm run lint src/app/your-component.ts
```

### Prettier (if configured)

```bash
# Format code
npm run format

# Check formatting
npm run format:check
```

### TypeScript Configuration

- **Strict mode**: Enabled
- **Target**: ES2020
- **Module**: ES2020
- **Decorators**: Enabled

### Git Hooks

Consider using Husky for pre-commit hooks:

```bash
# Install Husky
npm install --save-dev husky

# Configure hooks
npx husky install
npx husky add .husky/pre-commit "npm run lint && npm test"
```

## Testing

### Running Tests

```bash
# All tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# Specific test file
npm test -- --include="**/your-component.spec.ts"

# Debug mode
npm test -- --watch=false --browsers=Chrome
```

### Writing Tests

#### Component Tests

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YourComponent } from './your.component';

describe('YourComponent', () => {
  let component: YourComponent;
  let fixture: ComponentFixture<YourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

#### Service Tests

```typescript
import { TestBed } from '@angular/core/testing';
import { YourService } from './your.service';

describe('YourService', () => {
  let service: YourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```

### Test Coverage

- **Minimum coverage**: 80%
- **Critical paths**: 100% coverage
- **New features**: Must include tests
- **Bug fixes**: Must include regression tests

## Building

### Development Build

```bash
# Development build
npm run build

# Watch mode
npm run build --watch

# Source maps enabled
npm run build --source-map
```

### Production Build

```bash
# Production build
npm run build --configuration=production

# Analyze bundle
npm run build --stats-json
npx webpack-bundle-analyzer dist/stats.json
```

### Build Optimization

- **Tree shaking**: Enabled
- **Code splitting**: Automatic
- **Lazy loading**: Feature modules
- **Bundle analysis**: Available

## Troubleshooting

### Common Issues

#### Node Version Problems

```bash
# Check Node version
node --version

# Use nvm to switch versions
nvm use 22.18.0

# Or reinstall Node.js
```

#### Dependency Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

#### Build Errors

```bash
# Check Angular CLI version
ng version

# Update Angular CLI
npm install -g @angular/cli@latest

# Clear Angular cache
ng cache clean
```

#### Test Failures

```bash
# Check test configuration
cat karma.conf.js

# Run tests with verbose output
npm test -- --verbose

# Check for missing dependencies
npm list --depth=0
```

### Performance Issues

#### Build Performance

```bash
# Enable build cache
ng build --cache

# Use parallel builds
ng build --parallel

# Profile build process
ng build --verbose
```

#### Runtime Performance

- Use Angular DevTools profiler
- Check bundle size
- Monitor memory usage
- Profile component rendering

## Best Practices

### Code Organization

1. **Feature-based structure**
2. **Shared modules for common functionality**
3. **Lazy loading for feature modules**
4. **Consistent naming conventions**

### Performance

1. **OnPush change detection strategy**
2. **TrackBy functions for ngFor**
3. **Unsubscribe from observables**
4. **Use async pipe when possible**

### Security

1. **Environment Files**: Never commit real environment files or Firebase credentials
   - Real files are excluded from git automatically
   - Get credentials from admin@accessiblewebmedia.com
   - Run security checks: `./scripts/check-env-security.sh`
   - See `docs/SECURITY.md` for guidelines

2. **Sanitize user input**
3. **Use HTTPS in production**
4. **Implement proper authentication**
5. **Validate all data**
6. **Never commit secrets or API keys**

### Accessibility

1. **Semantic HTML**
2. **ARIA attributes**
3. **Keyboard navigation**
4. **Screen reader support**

### Testing

1. **Test behavior, not implementation**
2. **Use meaningful test descriptions**
3. **Mock external dependencies**
4. **Test edge cases**

## Resources

### Documentation

- [Angular Documentation](https://angular.io/docs)
- [Ionic Documentation](https://ionicframework.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Tools

- [Angular CLI](https://cli.angular.io/)
- [Ionic CLI](https://ionicframework.com/docs/cli)
- [Capacitor](https://capacitorjs.com/docs)

### Community

- [Angular Community](https://angular.io/community)
- [Ionic Community](https://ionicframework.com/community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/angular)

This development guide should help you get started and maintain high-quality development practices throughout the project lifecycle.
