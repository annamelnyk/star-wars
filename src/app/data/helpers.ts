import { SwapiResourseField, SwapiResource } from './models/types';

const formatUrlPath = (value: string): string => value.toLowerCase().split(' ').join('-')

export const buildDetailsUrl = (item: SwapiResource): string  => {
  if (SwapiResourseField.Title in item) return formatUrlPath(item.title)
  if (SwapiResourseField.Name in item) return formatUrlPath(item.name)

  return ''
}