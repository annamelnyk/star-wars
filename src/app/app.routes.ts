import { Routes } from '@angular/router';
import { CharactersComponent } from './pages/characters/characters.component'
import { DetailsComponent } from './pages/details/details.component'

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
  {
    path: 'characters',
    component: CharactersComponent,
    loadChildren: () =>
      import('./pages/characters/characters.module').then((m) => m.CharactersModule),
  },
  {
    path: 'characters/:id',
    component: DetailsComponent,
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
    component: DetailsComponent,
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
    component: DetailsComponent,
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
    component: DetailsComponent,
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
    component: DetailsComponent,
    loadChildren: () =>
      import('./pages/details/details.module').then((m) => m.DetailsModule),
  },
  { path: '**', redirectTo: 'characters', pathMatch: 'full' },
];
