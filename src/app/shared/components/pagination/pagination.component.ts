import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

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

    //if (notFullPage > 0) pages.push(pages[pages.length])

    this.pagesList = [...pages]
    this.paginationList = [...this.pagesList].slice(0, 3)
    console.log('pageList', this.pagesList)
    console.log('fullPagesAmount', fullPagesAmount)
    console.log('notFullOage', notFullPage)
   })
  }

  showPartialPagination() {
    //this.

  }

  isPageActive = (page: number): boolean => this.currentPage === page

  pageOnCLick(page: number) {
    this.currentPage = page
    console.log('click', page)
    this.showPage.emit(page)
  }
}
