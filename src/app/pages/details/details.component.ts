import { HttpErrorResponse } from '@angular/common/http'
import { Location } from '@angular/common'
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
  private destroyRefExtra = inject(DestroyRef)
  item: any = null
  itemKeys: any[] = []
  isItemFavourite = false
  collectionName = ''
  title: string = ''
  isLoading = false
  isAdditionalInfoLoading = false
  isErrorOccured = false
  error: Error | null = null
  imageSrc = ''
  additionalFields: { name: string, items: { name: string, localUrl?: string }[] }[] = []
  showImage = true

  constructor(
    private activatedRoute: ActivatedRoute,
    private swapiService: SwapiService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.isLoading = true
    this.isAdditionalInfoLoading = true

    const itemId = this.activatedRoute.snapshot.params['id']
    const urlSymbols = this.router.url.split('/')
    this.collectionName = urlSymbols[0] || urlSymbols[1]
    let collectionInApi = this.collectionName

    if (collectionInApi === 'characters') collectionInApi = 'people'
    if (collectionInApi === 'spaceships') collectionInApi = 'starships'

    this.imageSrc = this.getImageSrc(itemId)
    this.swapiService
      .getItemById(collectionInApi, Number(itemId))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data: any) => {
          this.formatItem(data.result.properties)
          this.title = this.getTitle()
          this.isItemFavourite = this.swapiService.checkIsItemFavourite(data)
          this.isLoading = false
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false
          this.isErrorOccured = true
          this.error = err
        }
      })
  }

  getImageSrc(id: string): string {
    if (id && this.collectionName) {
      return `https://starwars-visualguide.com/assets/img/${this.collectionName}/${id}.jpg`
    }

    return ''
  }

  formatItem(item: any) {
    for (let key in item) {
      if (this.checkIfDataShouldBeOmitted(key) || this.checkIfValueContainsUrl(item[key]) || (Array.isArray(item[key]) && !item[key].length)) {
        continue
      }

      if (Array.isArray(item[key]) && item[key].length) {
        this.additionalFields.push({ name: key, items: [] })
        this.renderAdditionalInfoBlocks(key, item[key])
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

  renderAdditionalInfoBlocks(collectionName: string, urls: string[]) {
    urls.forEach(url => {
      this.swapiService.getItemByUrl(url)
        .pipe(takeUntilDestroyed(this.destroyRefExtra))
        .subscribe((data: any) => {
          const additionalFieldItem: any = {}
          additionalFieldItem.localUrl = `/${data.url.split('/').filter((v: string) => v).slice(-2).join('/')}`

          if (additionalFieldItem.localUrl.includes('people')) {
            additionalFieldItem.localUrl = additionalFieldItem.localUrl.replace('people', 'characters')
          }

          if ('name' in data) {
            additionalFieldItem.name = data.name
          }

          if ('title' in data) {
            additionalFieldItem.name = data.title
          }

          this.additionalFields.forEach(i => {
            if (i.name === collectionName) {
              i.items.push(additionalFieldItem)
            }
          })

          this.isAdditionalInfoLoading = false
        })
    })
  }

  getTitle(): string {
    const includesName = this.itemKeys.find(item => item.key === 'name')
    if (includesName) return includesName.value

    const includesTitle = this.itemKeys.find(item => item.key === 'title')
    if (includesTitle) return includesTitle.value

    return ''
  }

  checkIfDataShouldBeOmitted(field: string): boolean {
    return field === 'edited' || field === 'created'
  }

  checkIfValueContainsUrl(field: any): boolean {
    return (typeof field === 'string') && field.includes('http')
  }

  goBack() {
    this.location.back()
  }

  hideImage() {
    this.showImage = false
  }
}
