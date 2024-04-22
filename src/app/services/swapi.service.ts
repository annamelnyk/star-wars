import { Injectable } from '@angular/core'

import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { IBaseUrl, SwapiResource } from '../data/models/base-url'

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  private apiUrl: string = 'https://swapi.dev/api';
  favourites: any[] = []

  constructor(private _http: HttpClient) { }


  getData(resource: string, page: number = 1): Observable<IBaseUrl> {
    return this._http.get<IBaseUrl>(`${this.apiUrl}/${resource}?page=${page}`)
  }

  getDataItem(resource: SwapiResource, index: number) {
    return this._http.get(`${this.apiUrl}/${resource}/${index}`)
  }


}
