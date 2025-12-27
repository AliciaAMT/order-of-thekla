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
  selector: 'app-forum',
  templateUrl: 'forum.page.html',
  styleUrls: ['forum.page.scss'],
  imports: [
    MainHeaderComponent,
    IonContent
  ],
})
export class ForumPage {
  constructor() {}
}






