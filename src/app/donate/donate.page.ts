import { Component } from '@angular/core';
import { 
  IonContent
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { MainHeaderComponent } from '../components/main-header/main-header.component';

@Component({
  selector: 'app-donate',
  templateUrl: 'donate.page.html',
  styleUrls: ['donate.page.scss'],
  imports: [
    MainHeaderComponent,
    IonContent,
    RouterLink
  ],
})
export class DonatePage {
  constructor() {}
}

