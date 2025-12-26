import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseService } from '../services/firebase.service';

export const emailVerifiedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const firebaseService = inject(FirebaseService);

  return new Promise((resolve) => {
    onAuthStateChanged(firebaseService.auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          resolve(true);
        } else {
          // Redirect to dashboard to show verification prompt
          router.navigate(['/member-dashboard']);
          resolve(false);
        }
      } else {
        router.navigate(['/join-us'], { queryParams: { returnUrl: state.url } });
        resolve(false);
      }
    });
  });
};






