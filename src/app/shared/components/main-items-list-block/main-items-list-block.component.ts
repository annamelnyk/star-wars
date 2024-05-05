import { Component, OnInit, Input, inject, DestroyRef } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { BehaviorSubject } from 'rxjs'

import { SwapiService } from 'src/app/services/swapi.service'
import { SwapiResource, SwapiResourseField } from 'src/app/data/models/types'
import { Tab } from 'src/app/data/constants'

interface ItemsList {
  [Tab.All]: SwapiResource[],
  [Tab.Favourites]: SwapiResource[],
}

@Component({
  selector: 'app-main-items-list-block',
  templateUrl: './main-items-list-block.component.html',
  styleUrls: ['./main-items-list-block.component.scss']
})
export class MainItemsListBlockComponent implements OnInit {
  public itemsList: ItemsList = {
    [Tab.All]: [],
    [Tab.Favourites]: []
  };
  collectionToRender: SwapiResource[] = []
  isLoading = false
  pagesAmount = 0
  searchQuery = ''
  private _pagesAmount$ = new BehaviorSubject<number>(this.pagesAmount)
  pagesAmount$ = this._pagesAmount$.asObservable()
  private _activePage$ = new BehaviorSubject<number>(1)
  activePage$ = this._activePage$.asObservable()
  private destroyRef1 = inject(DestroyRef)
  private destroyRef2 = inject(DestroyRef)
  @Input() collectionName!: string

  constructor(private swapiService: SwapiService) { }

  get activePage() {
    return this._activePage$.getValue()
  }

  ngOnInit(): void {
    this.isLoading = true
    this.activePage$
      .pipe(takeUntilDestroyed(this.destroyRef1))
      .subscribe((value) => {
        this.swapiService
          .getData(this.collectionName, value)
          .pipe(takeUntilDestroyed(this.destroyRef2))
          .subscribe((data: any) => {
            this.itemsList[Tab.All] = data.results
            this.checkFavouriteItems()
            this.collectionToRender = this.itemsList[Tab.All]
            console.log(data)
            this.pagesAmount = data.count
            this._pagesAmount$.next(data.count)
            this.isLoading = false
          })
      })
  }

  checkFavouriteItems() {
    this.itemsList[Tab.All] = this.itemsList[Tab.All]?.map((i) => {
      return {
        ...i,
        category: this.collectionName,
        favourite: this.swapiService.favourites.some(item => {
          if (SwapiResourseField.Title in i) return i.title === item.title
          if (SwapiResourseField.Name in i) return i.name === item.name
          return false
        })
      }
    })

    this.itemsList[Tab.Favourites] = this.swapiService.favourites.filter(i => i?.category === this.collectionName)
  }

  itemTrackBy(index: number, item: SwapiResource): string {
    if (SwapiResourseField.Title in item) return item.title
    if (SwapiResourseField.Name in item) return item.name

    return ''
  }

  markFavouriteItem(item: SwapiResource) {
    if (item.favourite) {
      this.swapiService.removeFromFavourite(item)
    } else {
      this.swapiService.addToFavourite(item)
    }
    item.favourite = !item.favourite
    this.checkFavouriteItems()
  }

  displayActivePageData(e: number) {
    this.isLoading = true
    this._activePage$.next(e)
  }

  showFilteredByTabData(tab: string) {
    switch (tab) {
      case Tab.Favourites:
        this._pagesAmount$.next(0)
        this.collectionToRender = this.itemsList[Tab.Favourites]
        break

      case Tab.All:
        this._pagesAmount$.next(this.pagesAmount)
        this.collectionToRender = this.itemsList[Tab.All]
    }
  }

  getSearchValue(value: string) {
    this.searchQuery = value
  }

  getItemId(item: SwapiResource): string {
    return item.url
      .split('/')
      .filter(v => v)
      .at(-1) as string
  }

  getItemIndex(i: number): number {
    return this.activePage * 10 -10 + i
  }
}
