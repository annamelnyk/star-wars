import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { SwapiResource, IBaseUrl, SwapiResourseField, SwapiInitialResource } from '../data/models/types'

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  private apiUrl: string = 'https://swapi.tech/api'
  favourites: any[] = []

  constructor(private _http: HttpClient) { }

  getData(resource: string, page: number = 1): Observable<IBaseUrl> {
    return this._http.get<IBaseUrl>(`${this.apiUrl}/${resource}?page=${page}`)
  }

  getItemById(resource: string, id: number): Observable<SwapiInitialResource> {
    return this._http.get<SwapiInitialResource>(`${this.apiUrl}/${resource}/${id}`)
  }

  getItemByUrl(url: string): Observable<SwapiInitialResource> {
    return this._http.get<SwapiInitialResource>(url)
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

  checkIsItemFavourite(item: SwapiResource | null): boolean {
    if (!item) return false

    const containsInFavourite = this.favourites.find((i: any) => {
      if (SwapiResourseField.Title in item && SwapiResourseField.Title in i) {
        return item.title === i.title
      }

      if (SwapiResourseField.Name in item && SwapiResourseField.Name in i) {
        return item.name === i.name
      }

      return undefined
    })

    return Boolean(containsInFavourite)
  }
}
