import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './components/item/item.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TitleComponent } from './components/title/title.component';



@NgModule({
  declarations: [
    ItemComponent,
    ToolbarComponent,
    TitleComponent
  ],
  exports: [ItemComponent, ToolbarComponent, TitleComponent],
  imports: [
    CommonModule
  ],
  
})
export class SharedModule { }
