import { Routes } from '@angular/router';

import { AppComponent } from './app.component';

export const APP_ROUTES: Routes = [
  { path: 'main', component: AppComponent },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '**', redirectTo: 'main', pathMatch: 'full' },
];
