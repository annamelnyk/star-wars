import { Routes } from '@angular/router';

import { CharactersComponent } from './characters.component';
import { DetailsComponent } from '../details/details.component'

export const CHARACTER_ROUTES: Routes = [
  {
    path: '',
    component: CharactersComponent,
  },
];
