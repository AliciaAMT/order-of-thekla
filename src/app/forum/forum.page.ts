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
  selector: 'app-forum',
  templateUrl: 'forum.page.html',
  styleUrls: ['forum.page.scss'],
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
export class ForumPage {
  constructor(private menuController: MenuController) {
    addIcons({
      menu,
      close
    });
  }
}

