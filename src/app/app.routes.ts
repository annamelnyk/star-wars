import { Routes } from '@angular/router';

import { AppComponent } from './app.component';

export const APP_ROUTES: Routes = [
  {
    path: 'main',
    loadChildren: () =>
      import('./characters/characters.module').then((m) => m.CharactersModule),
  },
  {
    path: 'films',
    loadChildren: () =>
      import('./films/films.module').then((m) => m.FilmsModule),
  },
  {
    path: 'planets',
    loadChildren: () =>
      import('./planets/planets.module').then((m) => m.PlanetsModule),
  },
  {
    path: 'vehicles',
    loadChildren: () =>
      import('./vehicles/vehicles.module').then((m) => m.VehiclesModule),
  },
  {
    path: 'spaceships',
    loadChildren: () =>
      import('./spaceships/spaceships.module').then((m) => m.SpaceshipsModule),
  },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '**', redirectTo: 'main', pathMatch: 'full' },
];
