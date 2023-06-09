import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'characters',
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
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
  { path: '**', redirectTo: 'characters', pathMatch: 'full' },
];
