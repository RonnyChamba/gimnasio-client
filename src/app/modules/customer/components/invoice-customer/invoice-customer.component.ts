import { Component, Input } from '@angular/core';
import { typeModel } from 'src/app/utils/types';
@Component({
  selector: 'app-invoice-customer',
  templateUrl: './invoice-customer.component.html',
  styleUrls: ['./invoice-customer.component.scss']
})
export class InvoiceCustomerComponent  {

  // El identificador del cliente actual
  @Input() idCustomer: number;

  typeModel: typeModel = "INSCRIPTION";

 
}
