import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormCustomerComponent } from '../../forms/form-customer/form-customer.component';
@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrls: ['./home-customer.component.scss']
})
export class HomeCustomerComponent implements OnInit{

  flagClose = true;
 
  constructor(private modalService: NgbModal){}
  ngOnInit(): void {
    
  }
  
  
  onClickMenu(value:boolean){  

    this.flagClose = value;
  }


  openModal(){

    console.log("Abrir modal");

    this.modalService.open(FormCustomerComponent, {
      size: "lg"
    });
  }


}
