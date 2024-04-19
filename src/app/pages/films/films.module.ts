import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmsComponent } from './films.component';
import { SharedModule } from '../../shared/shared.module';
import { FILMS_ROUTES } from './films.routes';

@NgModule({
  declarations: [FilmsComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(FILMS_ROUTES)],
})
export class FilmsModule {}
