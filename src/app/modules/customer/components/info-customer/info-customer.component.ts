import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { typeModel, typePanelInfo } from 'src/app/utils/types';
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
  
  namePanelInfo: typeModel = 'DATA';
  @Output() namePanelInfoEmit = new EventEmitter<typeModel>();

  constructor() {}

  ngOnInit(): void {
    
  }

  changePanel(namePanelInfo: typeModel) {
    // If touch in same button than current component
    if (this.namePanelInfo == namePanelInfo) return;

    this.namePanelInfo = namePanelInfo;

    // Esta variable le paso al padre para saber el tipo de reporte que debera
    // genear en caso de que se presione el boton de generar reporte
    this.namePanelInfoEmit.emit(this.namePanelInfo);

    if (this.namePanelInfo == 'DATA') {
  
    }

    if (this.namePanelInfo == 'ATTENDANCE') {
      // consulta de registros diarios  de los clients
    }
    if (this.namePanelInfo == 'INSCRIPTION') {
      // consulta de las membresías de los clientes
    }
    if (this.namePanelInfo == 'EVOLUTION') {
      // consulta de las membresías de los clientes
    }
  }

  public getCustomer(customer: Customer){
    this.customerCurrent = customer;

    this.eventNameCustomer.next(this.customerCurrent.name);
  
  }
}
