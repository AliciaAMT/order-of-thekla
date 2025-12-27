import { Component } from '@angular/core';
import {
  IonContent,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { MainHeaderComponent } from '../components/main-header/main-header.component';

@Component({
  selector: 'app-who-was-thekla',
  templateUrl: 'who-was-thekla.page.html',
  styleUrls: ['who-was-thekla.page.scss'],
  imports: [
    MainHeaderComponent,
    IonContent,
    RouterLink
  ],
})
export class WhoWasTheklaPage {
  constructor() {}
}






