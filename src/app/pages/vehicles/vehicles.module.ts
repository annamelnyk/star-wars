import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclesComponent } from './vehicles.component';
import { SharedModule } from '../../shared/shared.module';
import { VEHICLES_ROUTES } from './vehicles.routes';

@NgModule({
  declarations: [VehiclesComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(VEHICLES_ROUTES)],
})
export class VehiclesModule {}
