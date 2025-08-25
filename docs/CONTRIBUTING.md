# Contributing to Order of Thekla

Thank you for your interest in contributing to the Order of Thekla website project! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing Requirements](#testing-requirements)
- [Documentation Standards](#documentation-standards)
- [Pull Request Process](#pull-request-process)
- [Support and Communication](#support-and-communication)

## Code of Conduct

### Our Pledge

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

Examples of behavior that contributes to a positive environment for our community include:

- Demonstrating empathy and kindness toward other people
- Being respectful of differing opinions, viewpoints, and experiences
- Giving and gracefully accepting constructive feedback
- Accepting responsibility and apologizing to those affected by our mistakes
- Focusing on what is best for the overall community

Examples of unacceptable behavior include:

- The use of sexualized language or imagery, and sexual attention or advances
- Trolling, insulting or derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate

## Getting Started

### Prerequisites

- Node.js 22.18.0
- Git
- A GitHub account
- Basic knowledge of Angular/Ionic development

### Initial Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/order-of-thekla.git
   cd order-of-thekla
   ```
3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/order-of-thekla.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Verify the setup**:
   ```bash
   npm start
   npm test
   npm run lint
   ```

## Development Workflow

### Branch Strategy

1. **Main Branch**: Contains production-ready code
2. **Development Branch**: Integration branch for features
3. **Feature Branches**: Individual features and fixes
4. **Release Branches**: Preparation for releases

### Creating a New Branch

```bash
# Ensure you're on the main branch and up to date
git checkout main
git pull upstream main

# Create and switch to a new feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/your-fix-name

# Or for dependency updates
git checkout -b deps/package-name-update
```

### Branch Naming Convention

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `deps/` - Dependency updates
- `refactor/` - Code refactoring
- `test/` - Test additions or improvements

## Code Standards

### General Principles

- **Readability**: Write code that is easy to read and understand
- **Maintainability**: Write code that is easy to modify and extend
- **Performance**: Consider performance implications of your code
- **Security**: Follow security best practices
- **Accessibility**: Ensure your code is accessible to all users

### Licensing Considerations

- **Code Contributions**: All code contributions are licensed under MIT License
- **Content Contributions**: Content remains copyright Order of Thekla
- **Third-party Code**: Ensure any third-party code is compatible with MIT License
- **Attribution**: Maintain proper copyright notices in contributed code

### Angular/Ionic Specific

- Follow the [Angular Style Guide](https://angular.io/guide/styleguide)
- Use Angular CLI for generating components, services, etc.
- Follow Ionic design patterns and conventions
- Use TypeScript features appropriately
- Implement proper error handling

### Code Formatting

- Use the project's ESLint configuration
- Run `npm run lint` before committing
- Use Prettier if configured (run `npm run format` if available)
- Maintain consistent indentation (2 spaces for this project)

### File Naming

- Use kebab-case for file names
- Use PascalCase for component names
- Use camelCase for variables and functions
- Use UPPER_SNAKE_CASE for constants

## Testing Requirements

### Test Coverage

- **Unit Tests**: All new code must have unit tests
- **Integration Tests**: Required for complex features
- **E2E Tests**: Required for critical user journeys
- **Coverage**: Aim for at least 80% code coverage

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test files
npm test -- --include="**/your-component.spec.ts"
```

### Writing Tests

- Test the component/service behavior, not implementation details
- Use descriptive test names
- Follow the AAA pattern (Arrange, Act, Assert)
- Mock external dependencies appropriately
- Test both success and error scenarios

## Documentation Standards

### Code Documentation

- Use JSDoc comments for public APIs
- Include examples in documentation
- Keep documentation up to date with code changes
- Document complex business logic

### Project Documentation

- Update README.md when adding new features
- Document breaking changes
- Keep API documentation current
- Update environment configuration as needed

### Commit Messages

Use conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Build process or auxiliary tool changes

Example:
```
feat(auth): add user authentication service

- Implement JWT token handling
- Add login/logout functionality
- Include unit tests for auth service

Closes #123
```

## Pull Request Process

### Before Submitting

1. **Ensure tests pass**:
   ```bash
   npm test
   npm run lint
   npm run build
   ```

2. **Update documentation** as needed

3. **Check for conflicts** with the main branch

4. **Self-review** your changes

### Creating the Pull Request

1. **Push your branch** to your fork
2. **Create a PR** against the main branch
3. **Fill out the PR template** completely
4. **Link related issues** using keywords like "Closes #123"
5. **Request reviews** from maintainers

### PR Review Process

1. **Automated checks** must pass (CI/CD)
2. **Code review** from at least one maintainer
3. **Address feedback** and make requested changes
4. **Maintainer approval** required for merge

### After Approval

- **Squash commits** if requested
- **Merge strategy** determined by maintainers
- **Delete feature branch** after successful merge

## Support and Communication

### Getting Help

- **Documentation**: Check the docs/ directory first
- **Issues**: Search existing issues before creating new ones
- **Discussions**: Use GitHub Discussions for questions
- **Email**: support@orderofthekla.org or support@oneassembly.church

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and community discussion
- **Pull Requests**: Code review and collaboration
- **Email**: Direct support and coordination

### Issue Reporting

When reporting issues:

1. **Use the issue template** if available
2. **Provide clear steps** to reproduce the problem
3. **Include relevant information** (OS, browser, Node version)
4. **Add screenshots** if applicable
5. **Check for duplicates** before creating new issues

## Recognition

Contributors will be recognized in:

- Project README.md
- Release notes
- Contributor acknowledgments
- GitHub contributors list

## Questions?

If you have questions about contributing, please don't hesitate to ask! You can:

- Open a GitHub Discussion
- Email the support team
- Comment on existing issues
- Reach out to maintainers directly

Thank you for contributing to the Order of Thekla project!
