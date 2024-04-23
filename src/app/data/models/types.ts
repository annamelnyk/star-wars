export interface ICharacter {
  name: string
  height: number
  mass: number
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
  created: string
  edited: string
  url: string
  favourite?: boolean
  category?: string
}

export interface IFilm {
  title: 'A New Hope'
  episode_id: number
  opening_crawl: string
  director: string
  producer: string
  release_date: string
  characters: string[]
  planets: string[]
  starships: string[]
  vehicles: string[]
  species: string[]
  created: string
  edited: string
  url: string
  favourite?: boolean
  category?: string
}

export interface IPlanet {
  name: string
  rotation_period: string
  orbital_period: string
  diameter: string
  climate: string
  gravity: string
  terrain: string
  surface_water: string
  population: string
  residents: string[]
  films: string[]
  created: string
  edited: string
  url: string
  favourite?: boolean
  category?: string
}

export interface IStarship {
  name: string
  model: string
  manufacturer: string
  cost_in_credits: string
  length: string
  max_atmosphering_speed: string
  crew: string
  passengers: string
  cargo_capacity: string
  consumables: string
  hyperdrive_rating: string
  MGLT: string
  starship_class: string
  pilots: string[]
  filmst: string[]
  created: string
  edited: string
  url: string
  favourite?: boolean
  category?: string
}

export interface IVehicle {
  name: string
  model: string
  manufacturer: string
  cost_in_credits: string
  length: string
  max_atmosphering_speed: string
  crew: string
  passengers: string
  cargo_capacity: string
  consumables: string
  vehicle_class: string
  pilots: string[]
  films: string[]
  created: string
  edited: string
  url: string
  favourite?: boolean
  category?: string
}

export type SwapiResource = ICharacter | IFilm | IPlanet | IStarship | IVehicle

export interface IBaseUrl {
  message: string
  total_records: number
  total_pages: number
  previous: null | string
  next: null | string
  results: Array<SwapiResource>
}

export enum SwapiResourseField {
  Name = 'name',
  Title = 'title'
}
