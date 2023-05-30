import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() public listCategory: string = '';

  @Input() public searchValue: string = '';
  private searchValue$: Subject<string> = new Subject();

  @Output() public searchInput: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.searchValue$.subscribe((value: string) =>
      this.searchInput.emit(value)
    );
  }

  updateSearch(value: string): void {
    console.log(value);
    this.searchValue$.next(value);
  }

  public buildPlaceholder(): string {
    const singleCategoryItem = this.listCategory.substring(
      0,
      this.listCategory.length - 1
    );

    return `Search by ${singleCategoryItem} name`;
  }
}
