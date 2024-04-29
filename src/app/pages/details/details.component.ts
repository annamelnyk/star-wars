import { Component, inject, OnInit, DestroyRef } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router } from '@angular/router'
import { ROUTES } from 'src/app/data/constants'
import { SwapiInitialResource, SwapiResource } from 'src/app/data/models/types'
import { SwapiService } from 'src/app/services/swapi.service'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  item: any = null
  itemKeys: any[] = []
  collectionName = ''
  private destroyRef = inject(DestroyRef)
  title: string = ''

  constructor(private activatedRoute: ActivatedRoute, private swapiService: SwapiService, private router: Router) { }

  ngOnInit(): void {
    const itemId = this.activatedRoute.snapshot.params['id']
    const urlSymbols = this.router.url.split('/')
    this.collectionName = urlSymbols[0] || urlSymbols[1]
    let collectionInApi = this.collectionName
    if (collectionInApi === 'characters') collectionInApi = 'people'


    this.swapiService
      .getItemById(collectionInApi, Number(itemId))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: any) => {
        this.formatItem(data.result.properties)
        this.title = this.getTitle()
      })

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
    const includesName = this.itemKeys.find(v => v.name)
    if (includesName) return includesName.name

    const includesTitle = this.itemKeys.find(v => v.title)
    if (includesTitle) return includesName.title

    return ''
  }

  checkIfDataShouldBeOmitted(field: string): boolean {
    return field === 'edited' || field === 'created' || field.includes('http')
  }
}
