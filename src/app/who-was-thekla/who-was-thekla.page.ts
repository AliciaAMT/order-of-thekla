import { Component, AfterViewInit } from '@angular/core';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonButtons,
  IonMenuButton,
  IonMenu,
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
    IonList,
    IonItem,
    IonLabel,
    RouterLink
  ],
})
export class WhoWasTheklaPage implements AfterViewInit {
  constructor(private menuController: MenuController) {
    addIcons({
      menu,
      close
    });
  }

  ngAfterViewInit() {
    // Ensure menu is enabled after view is initialized
    // This prevents the offsetHeight error by ensuring the content element exists
    setTimeout(() => {
      this.menuController.enable(true, 'main-menu');
    }, 0);
  }
}






