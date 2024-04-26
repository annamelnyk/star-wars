import { SwapiResourseField, SwapiResource } from './models/types';

export const buildDetailsUrl = (item: SwapiResource): string  => {
  if (SwapiResourseField.Title in item) return item.title.split(' ').join('')
  if (SwapiResourseField.Name in item) return item.name.split(' ').join('')

  return ''
}