import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() tabs: string[] = []
  @Output() onTabSelect = new EventEmitter<string>()
  activeTab: string = '';

  ngOnInit(): void {
    this.activeTab = this.tabs[0]
  }

  selectTab(tab: string) {
    this.onTabSelect.emit(tab)
    this.activeTab = tab
  }
}
