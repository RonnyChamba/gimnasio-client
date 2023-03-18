import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { messagesErrorCustomer } from '../../util/MessageValidationCustomer';

@Component({
  selector: 'app-form-update-customer',
  templateUrl: './form-update-customer.component.html',
  styleUrls: ['./form-update-customer.component.scss']
})
export class FormUpdateCustomerComponent implements OnInit {
 

  formData: FormGroup;
  validMessage = messagesErrorCustomer;


  constructor ( public modal: NgbActiveModal) {}

  ngOnInit(): void {
    
  }

  fnSubmit() {
  
  }

}
