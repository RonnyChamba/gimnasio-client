import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormCustomersComponent } from '../form-customers/form-customers.component';
import { FormUpdateCustomerComponent } from '../form-update-customer/form-update-customer.component';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss']
})
export class ListCustomersComponent  implements OnInit{


  constructor(private modalService: NgbModal){}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }


  editCustomer(ide: number){

    
    console.log("Abrir modal customer");

    const references =  this.modalService.open(FormCustomersComponent, {
     size: "lg"
   });

   references.componentInstance.ideCustomer= ide;

    
  }

}
