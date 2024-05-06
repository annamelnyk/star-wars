import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'

import { NotFoundComponent } from './not-found.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { NOT_FOUND_ROUTES } from './not-found.routes'

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(NOT_FOUND_ROUTES),
  ],
  exports: [RouterModule]
})
export class NotFoundModule { }
