import { Routes } from '@angular/router';

import { CharactersComponent } from './components/characters/characters.component';

export const CHARACTER_ROUTES: Routes = [
  {
    path: '',
    component: CharactersComponent,
  },
];
