import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core'
import { Observable } from 'rxjs'

enum StorageKeys {
  FirstPage = 'firstPage',
  LastPage = 'lastPage'
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {
  @Input() pagesAmount!: Observable<number>
  @Output() showPage = new EventEmitter<number>()
  pagesList: number[] = []
  paginationList: number[] = []
  currentPage = 1

  ngOnInit(): void {
    this.pagesAmount.subscribe(value => {
      const fullPagesAmount = value / 10
      const notFullPage = value % 10
      const pages: number[] = []

      for (let i = 1; i <= fullPagesAmount; i++) {
        pages.push(i)
      }

      this.pagesList = [...pages]

      if (localStorage.getItem(StorageKeys.FirstPage)) {
        const firstPageIndex = this.pagesList.findIndex((e: number) => e === Number(localStorage.getItem(StorageKeys.FirstPage)))
        const lastPageIndex = this.pagesList.findIndex((e: number) => e === Number(localStorage.getItem(StorageKeys.LastPage)))

        this.paginationList = [...this.pagesList].slice(firstPageIndex, lastPageIndex + 1)
      } else {
        this.paginationList = [...this.pagesList].slice(0, 3)
        this.savePaginationInStorage()
      }
    })
  }

  isBtnDisabled(button: string): boolean {
    switch (button) {
      case 'prev':
        return this.paginationList.includes(this.pagesList[0])
      case 'next':
        return this.paginationList.includes(this.pagesList[this.pagesList.length - 1])

      default:
        return false
    }
  }

  isPageActive = (page: number): boolean => this.currentPage === page

  pageOnCLick(page: number) {
    this.currentPage = page
    this.showPage.emit(page)
  }

  goToNext() {
    const lastShownPage: number | undefined = this.paginationList.at(-1)
    if (!lastShownPage) return // disable btn here
    const index = this.pagesList.findIndex((e: number) => e === lastShownPage)


    if (lastShownPage && this.pagesList[index + 1]) {
      this.paginationList.shift()
      this.paginationList.push(this.pagesList[index + 1])
      this.savePaginationInStorage()
    }
  }

  goToPrevious() {
    const firstShownPage: number = this.paginationList[0]
    const index = this.pagesList.findIndex((e: number) => e === firstShownPage)


    if (firstShownPage && this.pagesList[index - 1]) {
      this.paginationList.pop()
      this.paginationList.unshift(this.pagesList[index - 1])
      this.savePaginationInStorage()
    }
  }

  savePaginationInStorage() {
    if (!this.paginationList.length) return

    localStorage.setItem(StorageKeys.FirstPage, this.paginationList[0].toString())
    localStorage.setItem(StorageKeys.LastPage, this.paginationList[this.paginationList.length - 1]?.toString())
  }

  ngOnDestroy() {
    localStorage.clear()
  }
}
