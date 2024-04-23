import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common';
import { ItemComponent } from './components/item/item.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TitleComponent } from './components/title/title.component';
import { SearchComponent } from './components/search/search.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MainItemsListBlockComponent } from './components/main-items-list-block/main-items-list-block.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TabsComponent } from './components/tabs/tabs.component';

@NgModule({
  declarations: [
    ItemComponent,
    ToolbarComponent,
    TitleComponent,
    SearchComponent,
    SpinnerComponent,
    MainItemsListBlockComponent,
    PaginationComponent,
    TabsComponent
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [ItemComponent, ToolbarComponent, TitleComponent, SearchComponent, SpinnerComponent, MainItemsListBlockComponent],

})
export class SharedModule { }
