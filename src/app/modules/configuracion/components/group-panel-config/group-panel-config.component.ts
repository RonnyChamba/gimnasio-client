import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-group-panel-config',
  templateUrl: './group-panel-config.component.html',
  styleUrls: ['./group-panel-config.component.scss']
})
export class GroupPanelConfigComponent implements OnInit {

  typePanel = true;

  @Output() typePanelChange = new EventEmitter<boolean>();
  constructor() { }
  ngOnInit(): void {
  }

  changeTypePanel(type: boolean) {

    if (this.typePanel != type) {
      this.typePanel = type;
      this.typePanelChange.emit(this.typePanel);
      
    } else console.log('no change');
  }

}
