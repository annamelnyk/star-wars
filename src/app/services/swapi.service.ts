import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICharacter } from '../data/models/character';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  private apiUrl: string = 'https://swapi.dev/api';

  constructor(private _http: HttpClient) {}

  
  getData(resource: string) {
    return this._http.get(`${this.apiUrl}/${resource}`);
  }

  getDataItem(resource: any) {
  return this._http.get(`${this.apiUrl}/${resource}/${resource.id}`)
  }
}
