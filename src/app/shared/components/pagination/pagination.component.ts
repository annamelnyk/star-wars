import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() pagesAmount: number = 0
  @Output() showPage = new EventEmitter<number>()
  pagesList: number[] = []
  currentPage = 1

  ngOnInit(): void {
    const fullPagesAmount = this.pagesAmount / 10
    const notFullPage = this.pagesAmount % 10
    const pages: number[] = []

    for (let i = 1; i <= fullPagesAmount; i++) {
      pages.push(i)
    }

    if (notFullPage > 0) pages.push(pages[pages.length])

    this.pagesList = [...pages]
    console.log('pageList', this.pagesList)
    console.log('fullPagesAmount', fullPagesAmount)
    console.log('notFullOage', notFullPage)
  }

  isPageActive = (page: number): boolean => this.currentPage === page

  pageOnCLick(page: number) {
    console.log('click', page)
    this.showPage.emit(page)
  }
}
