import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-widget-error',
  template: `
  <div class="widget-container">
    <h5>Error: </h5>
    <p class="message">{{error?.message}}</p>
  </div>
  `,
  styleUrls: ['./widget-error.component.scss']
})
export class WidgetErrorComponent {
  @Input() error: Error | null = null

}
