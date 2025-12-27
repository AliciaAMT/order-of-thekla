import { Component } from '@angular/core';
import { 
  IonContent
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { MainHeaderComponent } from '../components/main-header/main-header.component';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.page.html',
  styleUrls: ['contact.page.scss'],
  imports: [
    MainHeaderComponent,
    IonContent,
    RouterLink
  ],
})
export class ContactPage {
  constructor() {}
}

