import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeOperationFormInsCustomer } from 'src/app/utils/utilForm';
import { FormCustomersComponent } from '../../components/form-customers/form-customers.component';
import { UtilCustomerService } from '../../services/util-customer.service';
import { typeModel } from 'src/app/utils/types';
import { TokenService } from 'src/app/modules/auth/service/token.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent  implements OnInit{

  flagClose = true;
  typeModel: typeModel ="CUSTOMER"

  constructor(
    private modalService: NgbModal,
    private tokenService: TokenService
    ){

      this.flagClose = this.tokenService.getFlagClose();
    }
  
  
    ngOnInit(): void {
  
  }
  
    onClickMenu(value:boolean){  

    this.flagClose = value;
    this.tokenService.setFlagClose(this.flagClose);
  }


  openModal(){

    console.log("Abrir modal customer");

        
    const param: TypeOperationFormInsCustomer = {
      type: 'newCliente',
      write: true
    }

    const references =  this.modalService.open(FormCustomersComponent, {
      size: "lg"
    });
    
    references.componentInstance.operationForm = param;

    
  }

}
