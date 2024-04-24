import { Pipe, PipeTransform } from '@angular/core'

import { SwapiResource, SwapiResourseField } from 'src/app/data/models/types'

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {
  transform(collection: SwapiResource[], searchQuery: string): SwapiResource[] {
    if (!searchQuery) return collection

    return collection.filter((item: SwapiResource) => {
      const value = searchQuery.toLowerCase()

      if (SwapiResourseField.Name in item) {
        return item[SwapiResourseField.Name].toLowerCase().includes(value)
      }

      if (SwapiResourseField.Title in item) {
        return item[SwapiResourseField.Title].toLowerCase().includes(value)
      }

      return false
    })
  }
}
