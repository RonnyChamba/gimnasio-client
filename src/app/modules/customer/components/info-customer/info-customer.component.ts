import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { typePanelInfo } from 'src/app/utils/types';
import { Customer } from 'src/app/core/models/customer-model';

@Component({
  selector: 'app-info-customer',
  templateUrl: './info-customer.component.html',
  styleUrls: ['./info-customer.component.scss'],
})
export class InfoCustomerComponent implements OnInit {
   customerCurrent: Customer;

  @Input() idCustomer: number;

  // Para pasarel name al padre  componente editor
  @Output() eventNameCustomer = new EventEmitter<string>();

  eventChangeStatus: boolean;
  
  namePanelInfo: typePanelInfo = 'DATA';

  constructor() {}

  ngOnInit(): void {
    
  }

  changePanel(namePanelInfo: typePanelInfo) {
    // If touch in same button than current component
    if (this.namePanelInfo == namePanelInfo) return;

    this.namePanelInfo = namePanelInfo;

    if (this.namePanelInfo == 'DATA') {
  
    }

    if (this.namePanelInfo == 'DAILY') {
      // consulta de registros diarios  de los clients
    }
    if (this.namePanelInfo == 'MONTH') {
      // consulta de las membresías de los clientes
    }
  }

  public getCustomer(customer: Customer){
    this.customerCurrent = customer;

    this.eventNameCustomer.next(this.customerCurrent.name);
  
  }
}
