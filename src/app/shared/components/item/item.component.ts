import { Component, EventEmitter, Input, Output } from '@angular/core'
import { SwapiResource } from 'src/app/data/models/types'
import { SwapiService } from 'src/app/services/swapi.service'

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() item!: SwapiResource;
  @Input() index: number = 1;
  @Output() onFavourite = new EventEmitter<SwapiResource>()

  constructor(private swapiService: SwapiService) {}

  getTitle(): string {
    if ('title' in this.item) return this.item.title
    if ('name' in this.item) return this.item.name

    return ''
  }

  getFavouriteIconClass(): string {
    console.log('favourite??? ', this.item)
    return this.item.favourite ? 'fa-solid fa-star' : 'fa-regular fa-star'
  }

  addOrRemoveToFavourite() {
    this.onFavourite.emit(this.item)
  }
}
