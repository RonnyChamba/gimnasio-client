import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily-customer',
  templateUrl: './daily-customer.component.html',
  styleUrls: ['./daily-customer.component.scss']
})
export class DailyCustomerComponent implements OnInit {


  @Input() idCustomer: number;

  ngOnInit(): void {
   
    console.log("Id lista diario de cliente: " +  this.idCustomer)
  }

}
