import { Component, OnInit } from '@angular/core';
import { 
  IonContent,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCheckbox,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSpinner,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  mail,
  lockClosed,
  people,
  checkmarkCircle,
  alertCircle
} from 'ionicons/icons';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, SignupData, LoginData } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseService } from '../services/firebase.service';
import { MainHeaderComponent } from '../components/main-header/main-header.component';

@Component({
  selector: 'app-join-us',
  templateUrl: 'join-us.page.html',
  styleUrls: ['join-us.page.scss'],
  imports: [
    MainHeaderComponent,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonCheckbox,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonSpinner,
    FormsModule,
    CommonModule
  ],
})
export class JoinUsPage implements OnInit {
  // Forum signup form
  forumSignup = {
    email: '',
    password: '',
    confirmPassword: '',
    subscribeToNewsletter: false,
    honeypot: '' // Hidden field for bot detection
  };

  // Newsletter-only signup
  newsletterEmail = '';

  // Login form
  login = {
    email: '',
    password: ''
  };

  activeTab: 'forum' | 'newsletter' | 'login' = 'forum';
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private firebaseService: FirebaseService
  ) {
    addIcons({
      mail,
      lockClosed,
      people,
      checkmarkCircle,
      alertCircle
    });
  }

  ngOnInit() {
    // Check if user is already authenticated
    onAuthStateChanged(this.firebaseService.auth, (user) => {
      this.isAuthenticated = !!user;
      if (user) {
        // If authenticated, redirect to dashboard
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/member-dashboard';
        this.router.navigate([returnUrl]);
      }
    });
  }

  async onForumSignup() {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    // Validation
    if (!this.forumSignup.email || !this.forumSignup.password) {
      this.errorMessage = 'Please fill in all required fields.';
      this.isLoading = false;
      return;
    }

    if (this.forumSignup.password !== this.forumSignup.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      this.isLoading = false;
      return;
    }

    if (this.forumSignup.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long.';
      this.isLoading = false;
      return;
    }

    // Honeypot check
    if (this.forumSignup.honeypot) {
      // Bot detected - silently fail
      this.isLoading = false;
      await this.showToast('Thank you for your interest!', 'success');
      return;
    }

    try {
      const signupData: SignupData = {
        email: this.forumSignup.email,
        password: this.forumSignup.password,
        subscribeToNewsletter: this.forumSignup.subscribeToNewsletter
      };

      const result = await this.authService.signUp(signupData);

      if (result.success) {
        this.successMessage = result.message;
        await this.showToast(result.message, 'success');
        
        // Clear form
        this.forumSignup = {
          email: '',
          password: '',
          confirmPassword: '',
          subscribeToNewsletter: false,
          honeypot: ''
        };

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          this.router.navigate(['/member-dashboard']);
        }, 2000);
      } else {
        this.errorMessage = result.message;
        await this.showToast(result.message, 'danger');
      }
    } catch (error: any) {
      this.errorMessage = 'An unexpected error occurred. Please try again.';
      await this.showToast(this.errorMessage, 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  async onNewsletterSignup() {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    if (!this.newsletterEmail || !this.isValidEmail(this.newsletterEmail)) {
      this.errorMessage = 'Please enter a valid email address.';
      this.isLoading = false;
      await this.showToast(this.errorMessage, 'danger');
      return;
    }

    try {
      await this.firestoreService.subscribeToNewsletter(this.newsletterEmail, 'newsletter_only');
      this.successMessage = 'Successfully subscribed to our newsletter!';
      await this.showToast(this.successMessage, 'success');
      this.newsletterEmail = '';
    } catch (error: any) {
      this.errorMessage = 'Failed to subscribe. Please try again.';
      await this.showToast(this.errorMessage, 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  async onLogin() {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    if (!this.login.email || !this.login.password) {
      this.errorMessage = 'Please enter your email and password.';
      this.isLoading = false;
      await this.showToast(this.errorMessage, 'danger');
      return;
    }

    try {
      const loginData: LoginData = {
        email: this.login.email,
        password: this.login.password
      };

      const result = await this.authService.signIn(loginData);

      if (result.success && result.user) {
        this.successMessage = result.message;
        await this.showToast(result.message, 'success');
        
        // Redirect to dashboard or return URL
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/member-dashboard';
        this.router.navigate([returnUrl]);
      } else {
        this.errorMessage = result.message;
        await this.showToast(result.message, 'danger');
      }
    } catch (error: any) {
      this.errorMessage = 'An unexpected error occurred. Please try again.';
      await this.showToast(this.errorMessage, 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  async onForgotPassword() {
    if (!this.login.email) {
      await this.showToast('Please enter your email address first.', 'warning');
      return;
    }

    this.isLoading = true;
    try {
      const result = await this.authService.sendPasswordReset(this.login.email);
      await this.showToast(result.message, result.success ? 'success' : 'danger');
    } catch (error: any) {
      await this.showToast('Failed to send password reset email. Please try again.', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  setActiveTab(tab: 'forum' | 'newsletter' | 'login') {
    this.activeTab = tab;
    this.errorMessage = '';
    this.successMessage = '';
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 4000,
      color,
      position: 'top'
    });
    await toast.present();
  }
}






