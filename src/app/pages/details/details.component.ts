import { HttpErrorResponse } from '@angular/common/http'
import { Component, inject, OnInit, DestroyRef } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router } from '@angular/router'
import { SwapiInitialResource, SwapiResourseField } from 'src/app/data/models/types'
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
  isErrorOccured = false
  error: Error | null = null
  imageSrc = ''
  additionalFields: {name: string, items: string[]}[] = []
  isAdditionalInfoLoading = false

  constructor(private activatedRoute: ActivatedRoute, private swapiService: SwapiService, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true
    const itemId = this.activatedRoute.snapshot.params['id']
    const urlSymbols = this.router.url.split('/')
    this.collectionName = urlSymbols[0] || urlSymbols[1]
    let collectionInApi = this.collectionName
    if (collectionInApi === 'characters') collectionInApi = 'people'

    this.imageSrc = this.getImageSrc(itemId)

    this.swapiService
      .getItemById(collectionInApi, Number(itemId))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data: any) => {
          this.formatItem(data)
          this.title = this.getTitle()
          this.isItemFavourite = this.swapiService.checkIsItemFavourite(data)
          this.isLoading = false
        },
        error: (err: HttpErrorResponse) => {
          console.log('ERRRRRRRRR')
          this.isLoading = false
          this.isErrorOccured = true
          this.error = err
        }
      })

    console.log(this.item)
  }

  getImageSrc(id: string): string {
    if (id && this.collectionName) {
      return `https://starwars-visualguide.com/assets/img/${this.collectionName}/${id}.jpg`
    }

    return ''
  }

  formatItem(item: any) {
    console.log('ITEM: ', item)
    for (let key in item) {
      if (this.checkIfDataShouldBeOmitted(key) || this.checkIfDataShouldBeOmitted(item[key])) {
        continue
      }

      if (Array.isArray(item[key]) && item[key].length) {
        this.additionalFields.push({name: key, items: []})
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
        this.isAdditionalInfoLoading = true
        this.additionalFields.forEach(f => {
          console.log('DATAAAAAA ', data)
          if (collectionName === f.name) {

            if ('name' in data) {
              f.items.push(data.name)
              return
            }

            if ('title' in data) {
              f.items.push(data.title)
            }
          }
        })
        console.log('additipnalFielsds ', this.additionalFields)
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
    return field === 'edited' || field === 'created' || field.includes('http')
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute })
  }
}
