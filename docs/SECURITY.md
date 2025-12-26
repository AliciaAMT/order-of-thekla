# Security Guidelines

## Environment Files Security

### Overview

This project uses Firebase for authentication and database services. Firebase credentials are sensitive and must never be committed to version control.

### Protected Files

The following files are **excluded from git** and should never be committed:

- `src/environments/environment.ts` - Development environment
- `src/environments/environment.prod.ts` - Production environment  
- `src/environments/environment.staging.ts` - Staging environment (if used)
- `src/environments/environment.prod.staging.ts` - Staging production build (if used)

### Template Files (Safe to Commit)

These files are templates and contain placeholder values:

- `src/environments/environment.example.ts` - Development template
- `src/environments/environment.prod.example.ts` - Production template

### Getting Credentials

To obtain Firebase configuration credentials:

**Email:** admin@accessiblewebmedia.com

Include in your request:
- Your name and role
- Why you need access
- Which environment (dev, staging, or production)

### Setup Process

1. Copy the example file to create your local environment file:
   ```bash
   cp src/environments/environment.example.ts src/environments/environment.ts
   ```

2. Request credentials from admin@accessiblewebmedia.com

3. Fill in the Firebase configuration in your local file

4. **Never commit** the real file - it's automatically excluded

### Verification

#### Unix/Mac/Linux
```bash
./scripts/check-env-security.sh
```

#### Windows (PowerShell)
```powershell
.\scripts\check-env-security.ps1
```

#### Manual Check
```bash
git status
```

Real environment files should NOT appear in the output.

### If Files Were Accidentally Committed

If environment files were committed before being added to `.gitignore`:

1. Remove from git tracking (keeps local file):
   ```bash
   git rm --cached src/environments/environment.ts
   git rm --cached src/environments/environment.prod.ts
   ```

2. Commit the removal:
   ```bash
   git commit -m "Remove environment files from tracking"
   ```

3. If already pushed, consider rotating credentials

### Security Best Practices

1. ✅ **DO**: Use example files as templates
2. ✅ **DO**: Request credentials from admin@accessiblewebmedia.com
3. ✅ **DO**: Keep credentials only in local files
4. ✅ **DO**: Run security checks before committing
5. ❌ **DON'T**: Commit real environment files
6. ❌ **DON'T**: Share credentials in chat/email (use secure channels)
7. ❌ **DON'T**: Hardcode credentials in source code
8. ❌ **DON'T**: Store credentials in environment variables that get committed

### Additional Security Measures

- `.gitignore` - Excludes environment files from git
- `.gitattributes` - Marks environment files as sensitive
- Security check scripts - Verify files aren't tracked
- README documentation - Clear instructions for all developers

### Reporting Security Issues

If you discover that credentials have been exposed:

1. **Immediately** contact admin@accessiblewebmedia.com
2. Do NOT commit any fixes that might expose more information
3. Follow instructions from the administrator

---

**Remember:** Security is everyone's responsibility. When in doubt, ask before committing sensitive information.







