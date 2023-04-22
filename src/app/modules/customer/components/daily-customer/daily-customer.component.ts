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

}
