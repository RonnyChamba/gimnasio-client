import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaginatorCustomer } from 'src/app/core/models/page-render.model';
import { TypeOperationFormInsCustomer } from 'src/app/utils/utilForm';
import { FormCustomersComponent } from '../../components/form-customers/form-customers.component';
import { UtilCustomerService } from '../../services/util-customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent  implements OnInit{

  flagClose = true;
  formData: FormGroup;
  // filteProperties: FilterProperties;

  constructor(private modalService: NgbModal,
    private utilCustomerService: UtilCustomerService){}
  ngOnInit(): void {
  
    this.createForm();
    this.onChangeListeners();
  }
  private onChangeListeners() {
    
    this.formData.valueChanges.subscribe (data =>{
      // this.paramPaginator = data;

      this.utilCustomerService.getRefreshFilterTable.next(data as PaginatorCustomer);

    })

 
    
  }
  private createForm() {
    
    this.formData = new FormGroup(
      {
        size: new FormControl(5, []),
        dateBegin: new FormControl(null, []),
        dateEnd: new FormControl(null, []),
        valueSearch: new FormControl(null, []),
      });
  }

  
  onClickMenu(value:boolean){  

    this.flagClose = value;
  }


  openModal(){

    console.log("Abrir modal customer");

        
    const param: TypeOperationFormInsCustomer = {
      type: 'newCliente',
      // ideOperation: ide
      write: true
    }

    const references =  this.modalService.open(FormCustomersComponent, {
      size: "lg"
    });
    
    references.componentInstance.operationForm = param;

  
        
  }

}
