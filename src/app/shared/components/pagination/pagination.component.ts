import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
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
      this.paginationList = [...this.pagesList].slice(0, 3)
      console.log('pageList', this.pagesList)
      console.log('fullPagesAmount', fullPagesAmount)
      console.log('notFullOage', notFullPage)
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
    console.log('click', page)
    this.showPage.emit(page)
  }

  goToNext() {
    const lastShownPage: number | undefined = this.paginationList.at(-1)
    if (!lastShownPage) return // disable btn here
    const index = this.pagesList.findIndex((e: number) => e === lastShownPage)


    if (lastShownPage && this.pagesList[index + 1]) {
      this.paginationList.shift()
      this.paginationList.push(this.pagesList[index + 1])
      console.log('NEXT', this.paginationList)
    }
  }

  goToPrevious() {

    const firstShownPage: number = this.paginationList[0]
    const index = this.pagesList.findIndex((e: number) => e === firstShownPage)


    if (firstShownPage && this.pagesList[index - 1]) {
      this.paginationList.pop()
      this.paginationList.unshift(this.pagesList[index - 1])
      console.log('prev ', this.paginationList)
    }
  }
}
