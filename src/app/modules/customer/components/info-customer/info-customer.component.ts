import { Component } from '@angular/core';

@Component({
  selector: 'app-info-customer',
  templateUrl: './info-customer.component.html',
  styleUrls: ['./info-customer.component.scss']
})
export class InfoCustomerComponent {

   flagPanelCustomer = "DATA";
  changePanel(namePanel: string){

    this.flagPanelCustomer = namePanel;

  }
}
