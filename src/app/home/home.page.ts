import { Component } from '@angular/core';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonButtons,
  IonMenuButton,
  IonMenu,
  IonIcon,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  MenuController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  menu, 
  close, 
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

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonButtons,
    IonMenuButton,
    IonMenu,
    IonIcon,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonList,
    FormsModule,
    RouterLink
  ],
})
export class HomePage {
  newsletterEmail: string = '';

  constructor(private menuController: MenuController) {
    addIcons({
      menu,
      close,
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
