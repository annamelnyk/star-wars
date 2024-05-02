import { Component } from '@angular/core';
import { Router, Event, NavigationEnd} from '@angular/router';

import { ROUTES } from 'src/app/data/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isExpanded: boolean = false;
  public isLinkHidden: boolean = true;
  public isToggleClose: boolean = false;
  public currentRoute: string = ROUTES.CHARACTERS;
  public navRoutes = ROUTES;

  public toggleMenu(): void {
    this.isExpanded = !this.isExpanded;
    this.isLinkHidden = !this.isLinkHidden;
    this.isToggleClose = !this.isToggleClose;
  }
}
