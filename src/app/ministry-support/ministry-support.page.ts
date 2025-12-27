import { Component } from '@angular/core';
import {
  IonContent
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { MainHeaderComponent } from '../components/main-header/main-header.component';

@Component({
  selector: 'app-ministry-support',
  templateUrl: 'ministry-support.page.html',
  styleUrls: ['ministry-support.page.scss'],
  imports: [
    MainHeaderComponent,
    IonContent,
    RouterLink
  ],
})
export class MinistrySupportPage {
  constructor() {}
}

