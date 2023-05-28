import { ICharacter } from './character';
import { IFilm } from './film';
import { IPlanet } from './planet';
import { IStarship } from './starship';
import { IVehicle } from './vehicle';

export interface IBaseUrl {
  count: number;
  next: null | string;
  previous: null | string;
  results: Array<ICharacter | IFilm | IPlanet | IVehicle | IStarship>;
}
