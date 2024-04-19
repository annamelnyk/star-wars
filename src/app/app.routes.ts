import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'characters',
    loadChildren: () =>
      import('./pages/characters/characters.module').then((m) => m.CharactersModule),
  },
  {
    path: 'films',
    loadChildren: () =>
      import('./pages/films/films.module').then((m) => m.FilmsModule),
  },
  {
    path: 'planets',
    loadChildren: () =>
      import('./pages/planets/planets.module').then((m) => m.PlanetsModule),
  },
  {
    path: 'vehicles',
    loadChildren: () =>
      import('./pages/vehicles/vehicles.module').then((m) => m.VehiclesModule),
  },
  {
    path: 'spaceships',
    loadChildren: () =>
      import('./pages/spaceships/spaceships.module').then((m) => m.SpaceshipsModule),
  },
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
  { path: '**', redirectTo: 'characters', pathMatch: 'full' },
];
