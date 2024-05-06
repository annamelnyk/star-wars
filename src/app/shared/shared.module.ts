import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ItemComponent } from './components/item/item.component'
import { ToolbarComponent } from './components/toolbar/toolbar.component'
import { TitleComponent } from './components/title/title.component'
import { SearchComponent } from './components/search/search.component'
import { SpinnerComponent } from './components/spinner/spinner.component'
import { MainItemsListBlockComponent } from './components/main-items-list-block/main-items-list-block.component'
import { PaginationComponent } from './components/pagination/pagination.component'
import { TabsComponent } from './components/tabs/tabs.component'
import { SearchPipe } from '../pipes/search.pipe'
import { WidgetErrorComponent } from './widget-error/widget-error.component';
import { BackButtonComponent } from './back-button/back-button.component'

@NgModule({
  declarations: [
    ItemComponent,
    ToolbarComponent,
    TitleComponent,
    SearchComponent,
    SpinnerComponent,
    MainItemsListBlockComponent,
    PaginationComponent,
    TabsComponent,
    WidgetErrorComponent,
    BackButtonComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, SearchPipe],
  exports: [
    ItemComponent,
    ToolbarComponent,
    TitleComponent,
    SearchComponent,
    SpinnerComponent,
    MainItemsListBlockComponent,
    WidgetErrorComponent,
    BackButtonComponent
  ],

})
export class SharedModule { }
