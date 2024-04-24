import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Router, Event, NavigationEnd } from '@angular/router'

import { ROUTES, Tab } from 'src/app/data/constants'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  public activeRoute: string = ROUTES.CHARACTERS;
  @Input() pagesAmount!: Observable<number>
  @Output() activePage = new EventEmitter<number>()
  @Output() activeTab = new EventEmitter<string>()
  @Output() searchInputHandler = new EventEmitter<string>()
  Tab = Tab

  // define active route
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.urlAfterRedirects.replace('/', '')
      }
    })
  }

  onShowPage(e: number) {
    this.activePage.emit(e)
  }

  onTabSelectHandler(tab: string) {
    this.activeTab.emit(tab)
  }

  onSearchInput(e: string) {
    this.searchInputHandler.emit(e)
  }
}
