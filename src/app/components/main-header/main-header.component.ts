import { Component, AfterViewInit, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  MenuController
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { menu, close } from 'ionicons/icons';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    RouterLink
  ],
})
export class MainHeaderComponent implements OnInit, AfterViewInit {
  constructor(private menuController: MenuController) {
    addIcons({
      menu,
      close
    });
  }

  ngOnInit() {
    // Enable menu when component initializes
    this.menuController.enable(true, 'main-menu');
  }

  ngAfterViewInit() {
    // Ensure menu is enabled after view initialization
    setTimeout(() => {
      this.menuController.enable(true, 'main-menu');
    }, 100);
  }
}

