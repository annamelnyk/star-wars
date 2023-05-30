import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

import { ROUTES } from 'src/app/data/constants';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  public activeRoute: string = ROUTES.CHARACTERS;

  // define active route
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.urlAfterRedirects.replace('/', '');
      }
    });
  }
}
