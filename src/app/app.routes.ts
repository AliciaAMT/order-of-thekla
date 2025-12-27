import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { emailVerifiedGuard } from './guards/email-verified.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.page').then((m) => m.AboutPage),
  },
  {
    path: 'who-was-thekla',
    loadComponent: () => import('./who-was-thekla/who-was-thekla.page').then((m) => m.WhoWasTheklaPage),
  },
  {
    path: 'join-us',
    loadComponent: () => import('./join-us/join-us.page').then((m) => m.JoinUsPage),
  },
  {
    path: 'rule-of-life',
    loadComponent: () => import('./rule-of-life/rule-of-life.page').then((m) => m.RuleOfLifePage),
  },
  {
    path: 'devotions',
    loadComponent: () => import('./devotions/devotions.page').then((m) => m.DevotionsPage),
  },
  {
    path: 'ministry-support',
    loadComponent: () => import('./ministry-support/ministry-support.page').then((m) => m.MinistrySupportPage),
  },
  {
    path: 'donate',
    loadComponent: () => import('./donate/donate.page').then((m) => m.DonatePage),
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.page').then((m) => m.ContactPage),
  },
  {
    path: 'member-dashboard',
    loadComponent: () => import('./member-dashboard/member-dashboard.page').then((m) => m.MemberDashboardPage),
    canActivate: [authGuard],
  },
  {
    path: 'forum',
    loadComponent: () => import('./forum/forum.page').then((m) => m.ForumPage),
    canActivate: [authGuard, emailVerifiedGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
