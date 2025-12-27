import { Component } from '@angular/core';
import {
  IonContent
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { MainHeaderComponent } from '../components/main-header/main-header.component';

@Component({
  selector: 'app-devotions',
  templateUrl: 'devotions.page.html',
  styleUrls: ['devotions.page.scss'],
  imports: [
    MainHeaderComponent,
    IonContent,
    RouterLink
  ],
})
export class DevotionsPage {
  constructor() {}
}

