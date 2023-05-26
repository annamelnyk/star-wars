import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanetsComponent } from './components/planets/planets.component';
import { SharedModule } from '../shared/shared.module';
import { PLANETS_ROUTES } from './planets.routes';

@NgModule({
  declarations: [PlanetsComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(PLANETS_ROUTES)],
})
export class PlanetsModule {}
