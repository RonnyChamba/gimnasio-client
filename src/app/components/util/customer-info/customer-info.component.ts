import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent {

  flagPanelCustomer = "DATA";
  changePanel(namePanel: string){

    this.flagPanelCustomer = namePanel;

  }
}
