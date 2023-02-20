import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormCustomerComponent } from '../../forms/form-customer/form-customer.component';
import { FormDailyComponent } from '../../forms/form-daily/form-daily.component';
import { FormExpenseComponent } from '../../forms/form-expense/form-expense.component';

@Component({
  selector: 'app-accesos-directos',
  templateUrl: './accesos-directos.component.html',
  styleUrls: ['./accesos-directos.component.scss']
})
export class AccesosDirectosComponent implements OnInit {
  
  
  constructor(private modalService: NgbModal){}
  
  ngOnInit(): void {
    
  }


  openModalCustomer(){

    this.modalService.open(FormCustomerComponent,  {
      size : 'lg'
    });
  }
  openModalExpense(){

    this.modalService.open(FormExpenseComponent,  {
      size : 'lg'
    });
  }

  openModalDaily(){


    this.modalService.open(FormDailyComponent, {
      size: "lg"
    });
  }

}
