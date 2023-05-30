import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './components/item/item.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TitleComponent } from './components/title/title.component';
import { SearchComponent } from './components/search/search.component';



@NgModule({
  declarations: [
    ItemComponent,
    ToolbarComponent,
    TitleComponent,
    SearchComponent
  ],
  exports: [ItemComponent, ToolbarComponent, TitleComponent, SearchComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  
})
export class SharedModule { }
