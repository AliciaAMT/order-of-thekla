import { Component } from '@angular/core';
import { 
  IonContent,
  IonIcon,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonList
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  heart, 
  people, 
  star, 
  book, 
  bulb, 
  peopleCircle, 
  person, 
  handLeft, 
  gift,
  flame,
  sparkles
} from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MainHeaderComponent } from '../components/main-header/main-header.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    MainHeaderComponent,
    IonContent,
    IonIcon,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    FormsModule,
    RouterLink
  ],
})
export class HomePage {
  newsletterEmail: string = '';

  constructor() {
    addIcons({
      heart,
      people,
      star,
      book,
      bulb,
      sparkles,
      peopleCircle,
      person,
      handLeft,
      gift,
      flame
    });
  }

  onNewsletterSubmit() {
    if (this.newsletterEmail) {
      // TODO: Implement newsletter subscription
      console.log('Newsletter subscription:', this.newsletterEmail);
      alert('Thank you for subscribing!');
      this.newsletterEmail = '';
    }
  }
}
