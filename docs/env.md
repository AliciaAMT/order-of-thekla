# Environment Configuration

This project uses Angular's environment system to manage different configurations for development, staging, and production.

## Environment Files

### Development (`environment.ts`)
- **Mode**: Development
- **Production**: `false`
- **Use case**: Local development with hot reloading

### Production (`environment.prod.ts`)
- **Mode**: Production
- **Production**: `true`
- **Use case**: Production builds with optimizations

### Staging (`environment.staging.ts`)
- **Mode**: Staging
- **Production**: `false`
- **Use case**: Staging environment with development features

### Staging Production (`environment.prod.staging.ts`)
- **Mode**: Staging Production
- **Production**: `true`
- **Use case**: Production-optimized builds pointing to staging backends

## Firebase Configuration

Each environment file contains a Firebase configuration object:

```typescript
firebase: {
  apiKey: '',           // Your Firebase API key
  authDomain: '',       // Your Firebase auth domain
  projectId: '',        // Your Firebase project ID
  storageBucket: '',    // Your Firebase storage bucket
  messagingSenderId: '', // Your Firebase messaging sender ID
  appId: '',            // Your Firebase app ID
  measurementId: ''     // Your Firebase measurement ID (optional)
}
```

## Security ⚠️

**CRITICAL:** Real environment files are excluded from git. Never commit Firebase credentials.

### Getting Firebase Credentials

To obtain Firebase configuration credentials:
- **Email:** admin@accessiblewebmedia.com
- Include: Your name, role, and which environment you need

### Setup Process

1. **Copy the example file** to create your local environment file:
   ```bash
   cp src/environments/environment.example.ts src/environments/environment.ts
   ```

2. **Request credentials** from admin@accessiblewebmedia.com

3. **Fill in the Firebase configuration** in your local file

4. **Never commit** the real file - it's automatically excluded

See `src/environments/README.md` for detailed instructions.

## How to Use

1. **Get Firebase credentials** from admin@accessiblewebmedia.com (see Security section above)
2. **Copy example file** to create your local environment file
3. **Update environment files** with your actual values (local files only)
4. **Use in components**:

```typescript
import { environment } from '../environments/environment';

@Component({...})
export class MyComponent {
  firebaseConfig = environment.firebase;
  appName = environment.appName;
}
```

## Build Commands

- `npm start` → Uses `environment.ts`
- `npm run start:staging` → Uses `environment.staging.ts`
- `npm run build` → Uses `environment.prod.ts`
- `npm run build:staging` → Uses `environment.staging.ts`
- `npm run build:prod:staging` → Uses `environment.prod.staging.ts`

## Security Notes

### Protected Files

The following files are **excluded from git** and should never be committed:
- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`
- `src/environments/environment.staging.ts`
- `src/environments/environment.prod.staging.ts`

### Security Best Practices

- ✅ **DO**: Use example files as templates
- ✅ **DO**: Request credentials from admin@accessiblewebmedia.com
- ✅ **DO**: Keep credentials only in local files
- ✅ **DO**: Run security checks before committing (`./scripts/check-env-security.sh`)
- ❌ **DON'T**: Commit real environment files
- ❌ **DON'T**: Share credentials in chat/email
- ❌ **DON'T**: Hardcode credentials in source code

### Verification

Run the security check script to verify files aren't tracked:
```bash
# Unix/Mac/Linux
./scripts/check-env-security.sh

# Windows PowerShell
.\scripts\check-env-security.ps1
```

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

3. If already pushed, contact admin@accessiblewebmedia.com to rotate credentials

For more details, see `docs/SECURITY.md`.
