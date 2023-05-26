import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';

import { CharactersComponent } from './components/characters/characters.component';
import { SharedModule } from '../shared/shared.module';
import { CHARACTER_ROUTES } from './characters.routes';



@NgModule({
  declarations: [
  
    CharactersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(CHARACTER_ROUTES),
  ]
})
export class CharactersModule { }
