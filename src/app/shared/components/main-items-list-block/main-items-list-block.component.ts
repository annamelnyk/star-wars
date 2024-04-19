import { Component, OnInit, Input } from '@angular/core'
import { ICharacter } from 'src/app/data/models/character'
import { SwapiService } from 'src/app/services/swapi.service'

@Component({
  selector: 'app-main-items-list-block',
  templateUrl: './main-items-list-block.component.html',
  styleUrls: ['./main-items-list-block.component.scss']
})
export class MainItemsListBlockComponent implements OnInit {
  public itemsList: ICharacter[] = [];
  isLoading = false
  @Input() collectionName!: string

  constructor(private swapiService: SwapiService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.swapiService
      .getData(this.collectionName)
      .subscribe((data: any) => {
        this.itemsList = data.results
        this.isLoading = false
      })
  }

  itemTrackBy(index: number, item: ICharacter): string {
    console.log('itemsList ', this.itemsList)
    return item.name
  }
}
