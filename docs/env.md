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

## How to Use

1. **Copy your Firebase config** from the Firebase Console
2. **Update environment files** with your actual values
3. **Use in components**:

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

- Never commit real Firebase keys to version control
- Use `.env` files for local development (already in `.gitignore`)
- Consider using Firebase Functions for sensitive operations
- Rotate API keys regularly
