import { Injectable } from '@angular/core'

import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { SwapiResource, IBaseUrl } from '../data/models/types'

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  private apiUrl: string = 'https://www.swapi.tech/api'; //'https://swapi.dev/api'
  favourites: any[] = []

  constructor(private _http: HttpClient) { }


  getData(resource: string, page: number = 1): Observable<IBaseUrl> {
    return this._http.get<IBaseUrl>(`${this.apiUrl}/${resource}?page=${page}&limit=10`)
  }

  getDataItem(resource: SwapiResource, index: number) {
    return this._http.get(`${this.apiUrl}/${resource}/${index}`)
  }

  addToFavourite(resourseItem: SwapiResource) {
    this.favourites.push(resourseItem)
    console.log('add ', this.favourites)
  }

  removeFromFavourite(resourseItem: SwapiResource) {
    this.favourites = this.favourites.filter((item) => {
      if ('title' in resourseItem) {
        return item.title !== resourseItem.title
      }

      if ('name' in resourseItem) {
        return item.name !== resourseItem.name
      }

      return item
    })
    console.log('remove ', this.favourites)
  }
}
