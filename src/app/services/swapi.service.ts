import { Injectable } from '@angular/core'

import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { SwapiResource, IBaseUrl, SwapiResourseField } from '../data/models/types'

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

  getItemById(resource: SwapiResource, id: number) {
    return this._http.get(`${this.apiUrl}/${resource}/${id}`)
  }

  addToFavourite(resourseItem: SwapiResource) {
    this.favourites.push(resourseItem)
  }

  removeFromFavourite(resourseItem: SwapiResource) {
    this.favourites = this.favourites.filter((item) => {
      if (SwapiResourseField.Title in resourseItem) {
        return item.title !== resourseItem.title
      }

      if (SwapiResourseField.Name in resourseItem) {
        return item.name !== resourseItem.name
      }

      return item
    })
  }
}
