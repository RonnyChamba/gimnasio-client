import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterProperties } from 'src/app/core/interfaces/filter-properties.inteface';
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
  filteProperties: FilterProperties;

  constructor(private modalService: NgbModal,
    private utilCustomerService: UtilCustomerService){}
  ngOnInit(): void {
  
    this.createForm();
    this.onChangeListeners();
  }
  private onChangeListeners() {
    
    this.formData.valueChanges.subscribe (data =>{

      this.filteProperties = data;

      if (this.filteProperties.dateFilter =='') this.filteProperties.dateFilter = null;
      if (this.filteProperties.searchText =='') this.filteProperties.searchText = null;

      this.utilCustomerService.getRefreshFilterTable.next(this.filteProperties);

    })

 
    
  }
  private createForm() {
    
    this.formData = new FormGroup(
      {
        sizePage: new FormControl(5, []),
        dateFilter: new FormControl(null, []),
        searchText: new FormControl(null, []),
      });
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
