import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router } from '@angular/router'
import { SwapiInitialResource, SwapiResource } from 'src/app/data/models/types'
import { SwapiService } from 'src/app/services/swapi.service'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  item: any = null
  itemKeys: string[] = []
  private destroyRef = inject(DestroyRef)

  constructor(private activatedRoute: ActivatedRoute, private swapiService: SwapiService, private router: Router) {}

  ngOnInit(): void {
    const itemId = this.activatedRoute.snapshot.params['id']
    const urlSymbols = this.router.url.split('/')
    const collectionName: string = urlSymbols[0] || urlSymbols[1]

    this.swapiService
    .getItemById(collectionName, Number(itemId))
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((data: any) => {
      this.item = data.result.properties
      this.itemKeys = Object.keys(this.item)
    })

    console.log(this.item)
  }
}
