import { Component } from '@angular/core';
import { Router, Event, NavigationEnd} from '@angular/router';

import { ROUTES } from 'src/app/data/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isExpanded: boolean = true;
  public isLinkHidden: boolean = false;
  public isToggleClose: boolean = true;
  public currentRoute: string = ROUTES.CHARACTERS;
  public navRoutes = ROUTES;

  public toggleMenu(): void {
    this.isExpanded = !this.isExpanded;
    this.isLinkHidden = !this.isLinkHidden;
    this.isToggleClose = !this.isToggleClose;
  }
}
