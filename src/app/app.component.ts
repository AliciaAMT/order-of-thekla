import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
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
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

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
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  private routerSubscription?: Subscription;

  constructor(
    private menuController: MenuController,
    private router: Router
  ) {}

  ngOnInit() {
    // Enable menu when component initializes
    this.menuController.enable(true, 'main-menu');

    // Close menu when navigation completes
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.menuController.close('main-menu');
      });
  }

  ngAfterViewInit() {
    // Ensure menu is enabled after view initialization
    setTimeout(() => {
      this.menuController.enable(true, 'main-menu');
    }, 100);
  }

  ngOnDestroy() {
    // Clean up subscription
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
