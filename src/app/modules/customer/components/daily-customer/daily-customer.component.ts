import { Component, Input} from '@angular/core';
import { typeModel } from 'src/app/utils/types';

@Component({
  selector: 'app-daily-customer',
  templateUrl: './daily-customer.component.html',
  styleUrls: ['./daily-customer.component.scss']
})
export class DailyCustomerComponent {

  @Input() idCustomer: number;
  typeModel: typeModel = "ATTENDANCE";

   /**
   * Esta variable permite mostrar u ocultar el nombre del cliete en la tabla de asistencias
   *  Cuando es false se muestra el nombre del cliente, en caso contrario se oculta, por ejemplo
   * cuando la tabla de asistencia se muestre dentro de componente cusomter-editor no es necesario
   * mostrar el nombre del cliente ya estamos dentro de su perfil, pero cuando la mostramos desde
   * el modulo asistencia si es necesario mostrar el nombre del cliente
   */
  reduceColumns: boolean = true;

}
