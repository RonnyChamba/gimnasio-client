import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormCustomersComponent } from '../../components/form-customers/form-customers.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent  implements OnInit{

  flagClose = true;
 
  constructor(private modalService: NgbModal){}
  ngOnInit(): void {
    
  }
  
  
  onClickMenu(value:boolean){  

    this.flagClose = value;
  }


  openModal(){

    
    console.log("Abrir modal customer");

    this.modalService.open(FormCustomersComponent, {
      size: "lg"
    });

    
  }

}
