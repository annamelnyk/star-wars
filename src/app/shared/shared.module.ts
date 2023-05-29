import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './components/item/item.component';



@NgModule({
  declarations: [
    ItemComponent
  ],
  exports: [ItemComponent],
  imports: [
    CommonModule
  ],
  
})
export class SharedModule { }
