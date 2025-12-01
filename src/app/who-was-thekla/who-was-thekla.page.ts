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
  IonList,
  IonItem,
  IonLabel,
  MenuController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  menu, 
  close
} from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-who-was-thekla',
  templateUrl: 'who-was-thekla.page.html',
  styleUrls: ['who-was-thekla.page.scss'],
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
    RouterLink
  ],
})
export class WhoWasTheklaPage {
  constructor(private menuController: MenuController) {
    addIcons({
      menu,
      close
    });
  }
}

