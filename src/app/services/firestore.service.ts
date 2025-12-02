import { Injectable } from '@angular/core';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  updateDoc
} from 'firebase/firestore';
import { FirebaseService } from './firebase.service';

export type MemberLevel = 'member' | 'moderator' | 'admin' | 'contributor';

export interface ForumMember {
  uid: string;
  email: string;
  emailVerified: boolean;
  memberLevel: MemberLevel;
  createdAt: Date | any;
  subscribeToNewsletter: boolean;
  lastLogin?: Date | any;
  displayName?: string;
  badges?: string[];
}

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: Date | any;
  unsubscribedAt?: Date | any;
  active: boolean;
  source?: string; // 'forum_signup' | 'newsletter_only'
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firebaseService: FirebaseService) {}

  /**
   * Create a forum member document
   */
  async createForumMember(memberData: ForumMember): Promise<void> {
    const memberRef = doc(
      this.firebaseService.firestore,
      'forumMembers',
      memberData.uid
    );

    await setDoc(memberRef, {
      ...memberData,
      createdAt: serverTimestamp()
    });
  }

  /**
   * Get forum member data
   */
  async getForumMember(uid: string): Promise<ForumMember | null> {
    const memberRef = doc(
      this.firebaseService.firestore,
      'forumMembers',
      uid
    );

    const memberDoc = await getDoc(memberRef);
    
    if (memberDoc.exists()) {
      return memberDoc.data() as ForumMember;
    }

    return null;
  }

  /**
   * Update forum member data
   */
  async updateForumMember(uid: string, updates: Partial<ForumMember>): Promise<void> {
    const memberRef = doc(
      this.firebaseService.firestore,
      'forumMembers',
      uid
    );

    await updateDoc(memberRef, updates);
  }

  /**
   * Update email verification status
   */
  async updateEmailVerificationStatus(uid: string, verified: boolean): Promise<void> {
    await this.updateForumMember(uid, { emailVerified: verified });
  }

  /**
   * Subscribe to newsletter
   */
  async subscribeToNewsletter(email: string, source: string = 'newsletter_only'): Promise<void> {
    const subscriberRef = doc(
      this.firebaseService.firestore,
      'newsletterSubscribers',
      email.toLowerCase()
    );

    // Check if already exists
    const existingDoc = await getDoc(subscriberRef);
    
    if (existingDoc.exists()) {
      const data = existingDoc.data() as NewsletterSubscriber;
      // If unsubscribed, reactivate
      if (!data.active) {
        await setDoc(subscriberRef, {
          ...data,
          active: true,
          unsubscribedAt: null,
          source: source
        }, { merge: true });
      }
    } else {
      await setDoc(subscriberRef, {
        email: email.toLowerCase(),
        subscribedAt: serverTimestamp(),
        active: true,
        source: source
      });
    }
  }

  /**
   * Unsubscribe from newsletter
   */
  async unsubscribeFromNewsletter(email: string): Promise<void> {
    const subscriberRef = doc(
      this.firebaseService.firestore,
      'newsletterSubscribers',
      email.toLowerCase()
    );

    await setDoc(subscriberRef, {
      active: false,
      unsubscribedAt: serverTimestamp()
    }, { merge: true });
  }

  /**
   * Check if email is subscribed to newsletter
   */
  async isNewsletterSubscriber(email: string): Promise<boolean> {
    const subscriberRef = doc(
      this.firebaseService.firestore,
      'newsletterSubscribers',
      email.toLowerCase()
    );

    const subscriberDoc = await getDoc(subscriberRef);
    
    if (subscriberDoc.exists()) {
      const data = subscriberDoc.data() as NewsletterSubscriber;
      return data.active === true;
    }

    return false;
  }

  /**
   * Get member level for a user
   */
  async getMemberLevel(uid: string): Promise<MemberLevel> {
    const member = await this.getForumMember(uid);
    return member?.memberLevel || 'member';
  }

  /**
   * Check if user is admin
   */
  async isAdmin(uid: string): Promise<boolean> {
    const level = await this.getMemberLevel(uid);
    return level === 'admin';
  }

  /**
   * Check if user is moderator
   */
  async isModerator(uid: string): Promise<boolean> {
    const level = await this.getMemberLevel(uid);
    return level === 'moderator' || level === 'admin';
  }
}

