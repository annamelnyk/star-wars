import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() title: string = '';
  @Input() index: number = 1;
  @Input() isFavourite: boolean = false;
}
