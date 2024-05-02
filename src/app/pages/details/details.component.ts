import { HttpErrorResponse } from '@angular/common/http'
import { Component, inject, OnInit, DestroyRef } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router } from '@angular/router'
import { SwapiService } from 'src/app/services/swapi.service'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private destroyRef = inject(DestroyRef)
  item: any = null
  itemKeys: any[] = []
  collectionName = ''
  title: string = ''
  isLoading = false
  isErrorOccured = false
  errorMessage = 'Oops, something went wrong :('

  constructor(private activatedRoute: ActivatedRoute, private swapiService: SwapiService, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true
    const itemId = this.activatedRoute.snapshot.params['id']
    const urlSymbols = this.router.url.split('/')
    this.collectionName = urlSymbols[0] || urlSymbols[1]
    let collectionInApi = this.collectionName
    if (collectionInApi === 'characters') collectionInApi = 'people'

    this.swapiService
      .getItemById(collectionInApi, Number(itemId))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (data: any) => {
          console.log('DATA Details: ', data)
          this.formatItem(data.result.properties)
          this.title = this.getTitle()
          this.isLoading = false
        },
        (err: HttpErrorResponse) => {
          console.log('ERRRRRRRRR')
          this.isLoading = false
          this.isErrorOccured = true
          this.errorMessage = err.message ? err.message : this.errorMessage
        }
      )

    console.log(this.item)
  }

  formatItem(item: any) {
    for (let key in item) {
      if (this.checkIfDataShouldBeOmitted(key) || this.checkIfDataShouldBeOmitted(item[key])) {
        continue
      }

      if (key.includes('_')) {
        let keyFormatted = key.split('_').join(' ')
        this.itemKeys.push({
          key: keyFormatted,
          value: item[key]
        })
        continue
      }

      this.itemKeys.push({
        key,
        value: item[key],
      })
    }
  }

  getTitle(): string {
    const includesName = this.itemKeys.find(item => item.key === 'name')
    if (includesName) return includesName.value

    const includesTitle = this.itemKeys.find(item => item.key === 'title')
    if (includesTitle) return includesTitle.value

    return ''
  }

  checkIfDataShouldBeOmitted(field: string): boolean {
    return field === 'edited' || field === 'created' || field.includes('http')
  }
}
