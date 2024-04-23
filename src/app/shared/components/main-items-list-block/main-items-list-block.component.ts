import { Component, OnInit, Input, inject, DestroyRef } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { BehaviorSubject } from 'rxjs'

import { SwapiService } from 'src/app/services/swapi.service'
import { SwapiResource } from 'src/app/data/models/types'

@Component({
  selector: 'app-main-items-list-block',
  templateUrl: './main-items-list-block.component.html',
  styleUrls: ['./main-items-list-block.component.scss']
})
export class MainItemsListBlockComponent implements OnInit {
  public itemsList: SwapiResource[] = [];
  isLoading = false
  private _pagesAmount$ = new BehaviorSubject<number>(0)
  pagesAmount$ = this._pagesAmount$.asObservable()
  private _activePage$ = new BehaviorSubject<number>(1)
  activePage$ = this._activePage$.asObservable()
  private destroyRef1 = inject(DestroyRef)
  private destroyRef2 = inject(DestroyRef)
  @Input() collectionName!: string

  constructor(private swapiService: SwapiService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.activePage$
      .pipe(takeUntilDestroyed(this.destroyRef1))
      .subscribe((value) => {
        this.swapiService
          .getData(this.collectionName, value)
          .pipe(takeUntilDestroyed(this.destroyRef2))
          .subscribe((data: any) => {
            this.itemsList = data.results
            this.checkFavouriteItems()
            this._pagesAmount$.next(data.total_records)
            this.isLoading = false
          })
      })
  }

  checkFavouriteItems() {
    this.itemsList = this.itemsList.map((i) => {
      console.log('INCLUDES ', this.swapiService.favourites.includes(i))
      console.log('INCLUDES Favourites', this.swapiService.favourites)
      return {
        ...i,
        favourite: this.swapiService.favourites.some(item => {
          if ('title' in i) return i.title === item.title
          if ('name' in i) return i.name === item.name
          return false
        })
      }
    })
  }

  itemTrackBy(index: number, item: SwapiResource): string {
    if ('title' in item) return item.title
    if ('name' in item) return item.name

    return ''
  }

  markFavouriteItem(item: SwapiResource) {
    console.log('event item ', item)
    if (item.favourite) {
      this.swapiService.removeFromFavourite(item)
    } else {
      this.swapiService.addToFavourite(item)
    }
    //item.favourite = !item.favourite
    this.checkFavouriteItems()
  }

  displayActivePageData(e: number) {
    this.isLoading = true
    this._activePage$.next(e)
  }
}
