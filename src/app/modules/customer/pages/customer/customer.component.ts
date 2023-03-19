import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormCustomersComponent } from '../../components/form-customers/form-customers.component';
import { UtilCustomerService } from '../../services/util-customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent  implements OnInit{

  flagClose = true;
  size = 5;

  constructor(private modalService: NgbModal,
    private utilCustomerService: UtilCustomerService){}
  ngOnInit(): void {
    
  }
  

  changeNumberPage(event: any){
    // console.log(event)
    this.utilCustomerService.getRefreshNumPages.next(this.size);
  }

  search(value: string){
    // console.log(value)
    
    this.utilCustomerService.getRefreshSearch.next(value);
  }
  
  onClickMenu(value:boolean){  

    this.flagClose = value;
  }


  openModal(){

    console.log("Abrir modal customer");

     const references =  this.modalService.open(FormCustomersComponent, {
      size: "lg"
    });
        
  }

}
