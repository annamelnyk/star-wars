import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'

import { DetailsComponent } from './details.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { DETAILS_ROUTES } from './details.routes'

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(DETAILS_ROUTES),
  ],
  exports: [RouterModule]
})
export class DetailsModule { }
