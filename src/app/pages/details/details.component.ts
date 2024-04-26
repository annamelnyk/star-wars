import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router } from '@angular/router'
import { SwapiService } from 'src/app/services/swapi.service'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  itemId: string = ''
  private destroyRef = DestroyRef

  constructor(private activatedRoute: ActivatedRoute, private swapiService: SwapiService, private router: Router) {}

  ngOnInit(): void {
    this.itemId = this.activatedRoute.snapshot.params['id']
    //this.swapiService.getItemById(Number(this.itemId)).pipe(takeUntilDestroyed(this.destroyRef))
    console.log('ID ', this.activatedRoute.snapshot.params['id'])
    console.log('Route ', this.router.url)
  }
}
