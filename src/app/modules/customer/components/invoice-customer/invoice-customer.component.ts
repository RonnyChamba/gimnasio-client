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

  /**
   * Esta variable permite mostrar u ocultar el nombre del cliete en la tabla de membresías
   *  Cuando es false se muestra el nombre del cliente, en caso contrario se oculta, por ejemplo
   * cuando la tabla de inscripciones se muestre dentro de componente cusomter-editor no es necesario
   * mostrar el nombre del cliente ya estamos dentro de su perfil, pero cuando la mostramos desde
   * el modulo inscripciones si es necesario mostrar el nombre del cliente
   */
  reduceColumns: boolean = true;


 
}
