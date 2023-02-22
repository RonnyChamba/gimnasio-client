import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormCustomersComponent } from 'src/app/modules/customer/components/form-customers/form-customers.component';
import { GroupDailyComponent } from 'src/app/modules/daily/components/group-daily/group-daily.component';
import { FormExpensesComponent } from 'src/app/modules/expense/components/form-expenses/form-expenses.component';

@Component({
  selector: 'app-direct-access',
  templateUrl: './direct-access.component.html',
  styleUrls: ['./direct-access.component.scss']
})
export class DirectAccessComponent implements OnInit {
  
  
  constructor(private modalService: NgbModal){}
  
  ngOnInit(): void {
    
  }


  openModalCustomer(){
    console.log("Hola modal customer");

    this.modalService.open(FormCustomersComponent,  {
      size : 'lg'
    });
  }
  openModalExpense(){

    this.modalService.open(FormExpensesComponent,  {
      size : 'lg'
    });
  }

  openModalDaily(){


    this.modalService.open(GroupDailyComponent, {
      size: "lg"
    });
  }

}