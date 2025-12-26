import { Injectable } from '@angular/core';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendEmailVerification,
  User,
  UserCredential,
  AuthError,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth';
import { FirebaseService } from './firebase.service';
import { FirestoreService } from './firestore.service';
import { SecurityService } from './security.service';

export interface SignupData {
  email: string;
  password: string;
  subscribeToNewsletter: boolean;
  honeypot?: string; // Hidden field for bot detection
}

export interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private firebaseService: FirebaseService,
    private firestoreService: FirestoreService,
    private securityService: SecurityService
  ) {}

  /**
   * Sign up a new user for the forum
   */
  async signUp(data: SignupData): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      // Security checks
      if (data.honeypot) {
        return { success: false, message: 'Invalid request. Please try again.' };
      }

      const rateLimitCheck = await this.securityService.checkRateLimit(data.email);
      if (!rateLimitCheck.allowed) {
        return { 
          success: false, 
          message: rateLimitCheck.message || 'Too many signup attempts. Please try again later.' 
        };
      }

      // Create user account
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        this.firebaseService.auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // Create user document in Firestore with member level
      await this.firestoreService.createForumMember({
        uid: user.uid,
        email: user.email!,
        emailVerified: false,
        memberLevel: 'member', // Default level
        createdAt: new Date(),
        subscribeToNewsletter: data.subscribeToNewsletter || false
      });

      // If they want newsletter, add to newsletter collection
      if (data.subscribeToNewsletter) {
        await this.firestoreService.subscribeToNewsletter(user.email!);
      }

      // Record successful signup for rate limiting
      await this.securityService.recordSignupAttempt(data.email, true);

      return { 
        success: true, 
        message: 'Account created successfully! Please check your email to verify your account.',
        user 
      };
    } catch (error: any) {
      const authError = error as AuthError;
      let message = 'An error occurred during signup. Please try again.';

      // Provide specific error messages
      switch (authError.code) {
        case 'auth/email-already-in-use':
          message = 'This email is already registered. Please sign in instead.';
          break;
        case 'auth/invalid-email':
          message = 'Please enter a valid email address.';
          break;
        case 'auth/operation-not-allowed':
          message = 'Email/password accounts are not enabled. Please contact support.';
          break;
        case 'auth/weak-password':
          message = 'Password is too weak. Please use at least 6 characters.';
          break;
        case 'auth/network-request-failed':
          message = 'Network error. Please check your connection and try again.';
          break;
        case 'auth/too-many-requests':
          message = 'Too many requests. Please try again later.';
          break;
      }

      // Record failed attempt
      await this.securityService.recordSignupAttempt(data.email, false);

      return { success: false, message };
    }
  }

  /**
   * Sign in an existing user
   */
  async signIn(data: LoginData): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        this.firebaseService.auth,
        data.email,
        data.password
      );

      return { 
        success: true, 
        message: 'Signed in successfully!',
        user: userCredential.user 
      };
    } catch (error: any) {
      const authError = error as AuthError;
      let message = 'An error occurred during sign in. Please try again.';

      switch (authError.code) {
        case 'auth/user-not-found':
          message = 'No account found with this email address.';
          break;
        case 'auth/wrong-password':
          message = 'Incorrect password. Please try again.';
          break;
        case 'auth/invalid-email':
          message = 'Please enter a valid email address.';
          break;
        case 'auth/user-disabled':
          message = 'This account has been disabled. Please contact support.';
          break;
        case 'auth/too-many-requests':
          message = 'Too many failed attempts. Please try again later or reset your password.';
          break;
        case 'auth/network-request-failed':
          message = 'Network error. Please check your connection and try again.';
          break;
      }

      return { success: false, message };
    }
  }

  /**
   * Resend email verification
   */
  async resendVerificationEmail(): Promise<{ success: boolean; message: string }> {
    try {
      const user = this.firebaseService.auth.currentUser;
      if (!user) {
        return { success: false, message: 'No user is currently signed in.' };
      }

      if (user.emailVerified) {
        return { success: false, message: 'Your email is already verified.' };
      }

      await sendEmailVerification(user);
      return { 
        success: true, 
        message: 'Verification email sent! Please check your inbox (and spam folder).' 
      };
    } catch (error: any) {
      const authError = error as AuthError;
      let message = 'Failed to send verification email. Please try again.';

      if (authError.code === 'auth/too-many-requests') {
        message = 'Too many requests. Please wait a few minutes before requesting another email.';
      }

      return { success: false, message };
    }
  }

  /**
   * Send password reset email
   */
  async sendPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
    try {
      await sendPasswordResetEmail(this.firebaseService.auth, email);
      return { 
        success: true, 
        message: 'Password reset email sent! Please check your inbox.' 
      };
    } catch (error: any) {
      const authError = error as AuthError;
      let message = 'Failed to send password reset email. Please try again.';

      switch (authError.code) {
        case 'auth/user-not-found':
          message = 'No account found with this email address.';
          break;
        case 'auth/invalid-email':
          message = 'Please enter a valid email address.';
          break;
        case 'auth/too-many-requests':
          message = 'Too many requests. Please try again later.';
          break;
      }

      return { success: false, message };
    }
  }

  /**
   * Sign out current user
   */
  async signOut(): Promise<void> {
    await signOut(this.firebaseService.auth);
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.firebaseService.auth.currentUser;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.firebaseService.auth.currentUser;
  }

  /**
   * Check if user email is verified
   */
  isEmailVerified(): boolean {
    const user = this.firebaseService.auth.currentUser;
    return user ? user.emailVerified : false;
  }
}






