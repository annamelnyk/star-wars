import { Component } from '@angular/core';
import { Router, Event, NavigationEnd} from '@angular/router';

import { ROUTES } from 'src/app/data/constants';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {
  public currentRoute: string = ROUTES.CHARACTERS;

  // define active route
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {

        if (event instanceof NavigationEnd) {
            this.currentRoute = event.urlAfterRedirects.replace('/', '');
        }
    });
}
}
