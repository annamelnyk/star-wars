import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './components/item/item.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TitleComponent } from './components/title/title.component';
import { SearchComponent } from './components/search/search.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MainItemsListBlockComponent } from './components/main-items-list-block/main-items-list-block.component';



@NgModule({
  declarations: [
    ItemComponent,
    ToolbarComponent,
    TitleComponent,
    SearchComponent,
    SpinnerComponent,
    MainItemsListBlockComponent
  ],
  exports: [ItemComponent, ToolbarComponent, TitleComponent, SearchComponent, SpinnerComponent, MainItemsListBlockComponent],
  imports: [
    CommonModule,
    FormsModule
  ],

})
export class SharedModule { }
