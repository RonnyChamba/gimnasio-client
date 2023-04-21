import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { typeChangeStatus } from 'src/app/utils/types';
import { Customer } from 'src/app/core/models/customer-model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent  implements OnInit, OnDestroy {

  @Input() customerCurrent: Customer;

  @Output() eventChangeStatus = new EventEmitter<boolean>();

  constructor(
    private customerService: CustomerService) {}
  
  ngOnInit(): void {
  
    
  }
  
  ngOnDestroy(): void {
  
  }

  changeStatus(typeChange: typeChangeStatus){
    
    this.customerService.updateStatus(this.customerCurrent.ide, typeChange).subscribe(resp =>{
      console.log(resp)
      this.customerCurrent = resp as Customer;
    })

  }



}
