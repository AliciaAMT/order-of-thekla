import { Component, OnInit, OnDestroy } from '@angular/core';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonButtons,
  IonMenuButton,
  IonMenu,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonAlert,
  IonSpinner,
  MenuController,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  menu, 
  close,
  mail,
  checkmarkCircle,
  alertCircle,
  refresh,
  logOut,
  people,
  chatbubbles,
  documentText,
  heart
} from 'ionicons/icons';
import { RouterLink, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FirestoreService, ForumMember } from '../services/firestore.service';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FirebaseService } from '../services/firebase.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-member-dashboard',
  templateUrl: 'member-dashboard.page.html',
  styleUrls: ['member-dashboard.page.scss'],
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonButtons,
    IonMenuButton,
    IonMenu,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonAlert,
    IonSpinner,
    RouterLink,
    DatePipe
  ],
})
export class MemberDashboardPage implements OnInit, OnDestroy {
  user: User | null = null;
  memberData: ForumMember | null = null;
  isLoading = false;
  isResendingVerification = false;
  private authStateSubscription?: Subscription;

  constructor(
    private menuController: MenuController,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router,
    private toastController: ToastController,
    private firebaseService: FirebaseService
  ) {
    addIcons({
      menu,
      close,
      mail,
      checkmarkCircle,
      alertCircle,
      refresh,
      logOut,
      people,
      chatbubbles,
      documentText,
      heart
    });
  }

  ngOnInit() {
    // Listen to auth state changes
    onAuthStateChanged(this.firebaseService.auth, async (user) => {
      if (user) {
        this.user = user;
        await this.loadMemberData();
        
        // Check if email was verified
        if (user.emailVerified) {
          await this.firestoreService.updateEmailVerificationStatus(user.uid, true);
        }
      } else {
        // Not authenticated, redirect to join-us
        this.router.navigate(['/join-us']);
      }
    });
  }

  ngOnDestroy() {
    if (this.authStateSubscription) {
      this.authStateSubscription.unsubscribe();
    }
  }

  async loadMemberData() {
    if (!this.user) return;

    this.isLoading = true;
    try {
      this.memberData = await this.firestoreService.getForumMember(this.user.uid);
    } catch (error) {
      console.error('Error loading member data:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async resendVerificationEmail() {
    this.isResendingVerification = true;
    try {
      const result = await this.authService.resendVerificationEmail();
      await this.showToast(result.message, result.success ? 'success' : 'danger');
    } catch (error) {
      await this.showToast('Failed to resend verification email. Please try again.', 'danger');
    } finally {
      this.isResendingVerification = false;
    }
  }

  async signOut() {
    try {
      await this.authService.signOut();
      await this.showToast('Signed out successfully', 'success');
      this.router.navigate(['/join-us']);
    } catch (error) {
      await this.showToast('Error signing out. Please try again.', 'danger');
    }
  }

  getMemberLevelDisplay(): string {
    if (!this.memberData) return 'Member';
    
    switch (this.memberData.memberLevel) {
      case 'admin':
        return 'Administrator';
      case 'moderator':
        return 'Moderator';
      case 'contributor':
        return 'Contributor';
      default:
        return 'Member';
    }
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

