import { ICharacter } from './character';
import { IFilm } from './film';
import { IPlanet } from './planet';
import { IStarship } from './starship';
import { IVehicle } from './vehicle';

export type SwapiResource = ICharacter | IFilm | IPlanet | IStarship | IVehicle;

export interface IBaseUrl {
  count: number;
  next: null | string;
  previous: null | string;
  results: Array<SwapiResource>;
}
