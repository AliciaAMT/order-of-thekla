import { Component, AfterViewInit } from '@angular/core';
import { 
  IonApp, 
  IonRouterOutlet,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  MenuController
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonApp, 
    IonRouterOutlet,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    RouterLink
  ],
})
export class AppComponent implements AfterViewInit {
  constructor(private menuController: MenuController) {}

  ngAfterViewInit() {
    // Enable menu after app initialization
    setTimeout(() => {
      this.menuController.enable(true, 'main-menu');
    }, 100);
  }
}
