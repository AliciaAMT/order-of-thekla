import { Component } from '@angular/core';
import { 
  IonContent
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { MainHeaderComponent } from '../components/main-header/main-header.component';

@Component({
  selector: 'app-rule-of-life',
  templateUrl: 'rule-of-life.page.html',
  styleUrls: ['rule-of-life.page.scss'],
  imports: [
    MainHeaderComponent,
    IonContent,
    RouterLink
  ],
})
export class RuleOfLifePage {
  constructor() {}
}

