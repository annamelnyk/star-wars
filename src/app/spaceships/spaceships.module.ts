import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpaceshipsComponent } from './components/spaceships/spaceships.component';
import { SharedModule } from '../shared/shared.module';
import { SPACESHIPS_ROUTES } from './spaceships.routes';

@NgModule({
  declarations: [SpaceshipsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(SPACESHIPS_ROUTES),
  ],
})
export class SpaceshipsModule {}
