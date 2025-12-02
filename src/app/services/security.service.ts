import { Injectable } from '@angular/core';
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp,
  query,
  where,
  getDocs,
  limit
} from 'firebase/firestore';
import { FirebaseService } from './firebase.service';

interface RateLimitData {
  attempts: number;
  lastAttempt: any;
  blocked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private readonly MAX_SIGNUP_ATTEMPTS = 3; // Max attempts per hour
  private readonly RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
  private readonly MAX_SIGNUPS_PER_IP = 5; // Max signups per IP per day

  constructor(private firebaseService: FirebaseService) {}

  /**
   * Check if signup is allowed based on rate limiting
   */
  async checkRateLimit(email: string): Promise<{ allowed: boolean; message?: string }> {
    try {
      const rateLimitRef = doc(
        this.firebaseService.firestore,
        'rateLimits',
        `signup_${email.toLowerCase()}`
      );

      const rateLimitDoc = await getDoc(rateLimitRef);
      
      if (rateLimitDoc.exists()) {
        const data = rateLimitDoc.data() as RateLimitData;
        
        // Check if blocked
        if (data.blocked) {
          const lastAttempt = data.lastAttempt?.toDate();
          const timeSinceLastAttempt = Date.now() - lastAttempt.getTime();
          
          // Unblock after 24 hours
          if (timeSinceLastAttempt > 24 * 60 * 60 * 1000) {
            await setDoc(rateLimitRef, {
              attempts: 0,
              lastAttempt: serverTimestamp(),
              blocked: false
            }, { merge: true });
            return { allowed: true };
          }
          
          return { 
            allowed: false, 
            message: 'Too many failed signup attempts. Please try again tomorrow or contact support.' 
          };
        }

        // Check rate limit window
        const lastAttempt = data.lastAttempt?.toDate();
        if (lastAttempt) {
          const timeSinceLastAttempt = Date.now() - lastAttempt.getTime();
          
          if (timeSinceLastAttempt < this.RATE_LIMIT_WINDOW) {
            if (data.attempts >= this.MAX_SIGNUP_ATTEMPTS) {
              return { 
                allowed: false, 
                message: `Too many signup attempts. Please wait ${Math.ceil((this.RATE_LIMIT_WINDOW - timeSinceLastAttempt) / 60000)} minutes before trying again.` 
              };
            }
          } else {
            // Reset attempts if outside window
            await setDoc(rateLimitRef, {
              attempts: 0,
              lastAttempt: serverTimestamp()
            }, { merge: true });
          }
        }
      }

      return { allowed: true };
    } catch (error) {
      console.error('Rate limit check error:', error);
      // On error, allow the request (fail open, but log the error)
      return { allowed: true };
    }
  }

  /**
   * Record a signup attempt
   */
  async recordSignupAttempt(email: string, success: boolean): Promise<void> {
    try {
      const rateLimitRef = doc(
        this.firebaseService.firestore,
        'rateLimits',
        `signup_${email.toLowerCase()}`
      );

      const rateLimitDoc = await getDoc(rateLimitRef);
      const currentData = rateLimitDoc.exists() 
        ? (rateLimitDoc.data() as RateLimitData)
        : { attempts: 0, lastAttempt: null, blocked: false };

      const lastAttempt = currentData.lastAttempt?.toDate();
      const timeSinceLastAttempt = lastAttempt 
        ? Date.now() - lastAttempt.getTime()
        : this.RATE_LIMIT_WINDOW + 1;

      let newAttempts = currentData.attempts;

      // Reset if outside window
      if (timeSinceLastAttempt >= this.RATE_LIMIT_WINDOW) {
        newAttempts = 1;
      } else {
        newAttempts = (currentData.attempts || 0) + 1;
      }

      // Block if too many failed attempts
      const shouldBlock = !success && newAttempts >= this.MAX_SIGNUP_ATTEMPTS;

      await setDoc(rateLimitRef, {
        attempts: newAttempts,
        lastAttempt: serverTimestamp(),
        blocked: shouldBlock || currentData.blocked
      }, { merge: true });
    } catch (error) {
      console.error('Error recording signup attempt:', error);
      // Don't throw - rate limiting should not block signups if it fails
    }
  }

  /**
   * Check IP-based rate limiting (for additional security)
   * Note: This requires storing IP addresses, which should be done server-side in production
   */
  async checkIPRateLimit(ipAddress: string): Promise<{ allowed: boolean; message?: string }> {
    // This is a placeholder - in production, implement server-side IP tracking
    // For now, we'll rely on email-based rate limiting
    return { allowed: true };
  }
}

