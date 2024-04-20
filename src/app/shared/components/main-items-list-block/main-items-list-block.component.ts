import { Component, OnInit, Input, inject, DestroyRef } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { BehaviorSubject, Observable } from 'rxjs'
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
  private _pagesAmount$ = new BehaviorSubject<number>(0)
  pagesAmount$ = this._pagesAmount$.asObservable()
  private _activePage$ = new BehaviorSubject<number>(1)
  activePage$ = this._activePage$.asObservable()
  private destroyRef = inject(DestroyRef)
  @Input() collectionName!: string

  constructor(private swapiService: SwapiService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.activePage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.swapiService
        .getData(this.collectionName, value)
        .subscribe((data: any) => {
          this.itemsList = data.results
          this._pagesAmount$.next(data.count)
          this.isLoading = false
        })
      })
  }

  itemTrackBy(index: number, item: ICharacter): string {
    return item.name
  }

  displayActivePageData(e: number) {
    console.log('page displayActivePageData', e)
    this.isLoading = true
    this._activePage$.next(e)
  }
}
