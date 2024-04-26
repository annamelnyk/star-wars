import { Component, EventEmitter, Input, Output } from '@angular/core'
import { SwapiResource, SwapiResourseField } from 'src/app/data/models/types'
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
    if (SwapiResourseField.Title in this.item) return this.item.title
    if (SwapiResourseField.Name in this.item) return this.item.name

    return ''
  }

  getFavouriteIconClass(): string {
    return this.item.favourite ? 'fa-solid fa-star' : 'fa-regular fa-star'
  }

  addOrRemoveToFavourite() {
    this.onFavourite.emit(this.item)
  }
}
