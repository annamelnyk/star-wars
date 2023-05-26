import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isExpanded: boolean = false;
  public isLinkHidden: boolean = true;
  public isToggleClose: boolean = false;

  public toggleMenu(): void {
    this.isExpanded = !this.isExpanded;
    this.isLinkHidden = !this.isLinkHidden;
    this.isToggleClose = !this.isToggleClose;
  }
}
