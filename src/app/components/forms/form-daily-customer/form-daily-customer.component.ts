import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MAX_DESCRIPTION } from 'src/app/utils/Constants-Field';
import { validMessagesError } from 'src/app/utils/MessagesValidation';

@Component({
  selector: 'app-form-daily-customer',
  templateUrl: './form-daily-customer.component.html',
  styleUrls: ['./form-daily-customer.component.scss']
})
export class FormDailyCustomerComponent implements OnInit  {

  
  formData: FormGroup;  
  validMessage =  validMessagesError;
  constructor(public modal: NgbActiveModal){}
  ngOnInit(): void {
   this.createForm();
  }

  private createForm() {

    this.formData = new FormGroup({
      search: new FormControl(null, [
        Validators.required,
      ]),

    }, this.validarFormGeneral );
  }

  validarFormGeneral (g: any){

    // if (g.get('count').value == '') g.get('count').reset(1);

    return null;

  }
  fnSubmit() {

    // Verificar si el formulario es valido
    if (this.formData.status.toUpperCase()=='VALID'){
      console.log(this.formData.value);

      // Aqui consulta backend
    }else alert("Campos incorrectos")
    
  }
}
