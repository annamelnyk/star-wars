import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'people', pathMatch: 'full' },
  {
    path: 'people',
    loadChildren: () =>
      import('./pages/characters/characters.module').then((m) => m.CharactersModule),
  },
  {
    path: 'people/:id',
    loadChildren: () =>
      import('./pages/details/details.module').then((m) => m.DetailsModule),
  },
  {
    path: 'films',
    loadChildren: () =>
      import('./pages/films/films.module').then((m) => m.FilmsModule),
  },
  {
    path: 'films/:id',
    loadChildren: () =>
      import('./pages/details/details.module').then((m) => m.DetailsModule),
  },
  {
    path: 'planets',
    loadChildren: () =>
      import('./pages/planets/planets.module').then((m) => m.PlanetsModule),
  },
  {
    path: 'planets/:id',
    loadChildren: () =>
      import('./pages/details/details.module').then((m) => m.DetailsModule),
  },
  {
    path: 'vehicles',
    loadChildren: () =>
      import('./pages/vehicles/vehicles.module').then((m) => m.VehiclesModule),
  },
  {
    path: 'vehicles/:id',
    loadChildren: () =>
      import('./pages/details/details.module').then((m) => m.DetailsModule),
  },
  {
    path: 'spaceships',
    loadChildren: () =>
      import('./pages/spaceships/spaceships.module').then((m) => m.SpaceshipsModule),
  },
  {
    path: 'spaceships/:id',
    loadChildren: () =>
      import('./pages/details/details.module').then((m) => m.DetailsModule),
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];
