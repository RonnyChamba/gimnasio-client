import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormCustomersComponent } from 'src/app/modules/customer/components/form-customers/form-customers.component';
import { FormDailiesComponent } from 'src/app/modules/daily/components/form-dailies/form-dailies.component';
import { FormExpensesComponent } from 'src/app/modules/expense/components/form-expenses/form-expenses.component';
import { TypeOperationFormInsCustomer } from 'src/app/utils/utilForm';

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

    const param: TypeOperationFormInsCustomer = {
      type: 'newCliente',
      write: true
    }

    const references =  this.modalService.open(FormCustomersComponent, {
      size: "lg"
    });
    
    references.componentInstance.operationForm = param;
  }
  openModalExpense(){

    this.modalService.open(FormExpensesComponent,  {
      size : 'lg'
    });
  }

  openModalDaily(){

    // alert("Hola aqui se abrira un modal de asiste");

    this.modalService.open(FormDailiesComponent, {
      size: "lg"
    });
  }

}