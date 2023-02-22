import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MAX_DESCRIPTION } from 'src/app/utils/Constants-Field';
import { validMessagesError } from 'src/app/utils/MessagesValidation';

@Component({ 
  selector: 'app-form-dailies',
  templateUrl: './form-dailies.component.html',
  styleUrls: ['./form-dailies.component.scss']
})
export class FormDailiesComponent  implements OnInit {
 
  formData: FormGroup;  
  validMessage =  validMessagesError;
  constructor(public modal: NgbActiveModal){}
  ngOnInit(): void {
   this.createForm();
  }

  private createForm() {

    this.formData = new FormGroup({
      description: new FormControl('Diario Normal', [
        Validators.required,
        Validators.maxLength(MAX_DESCRIPTION),
      ]),
      price: new FormControl(2.00, [
        Validators.required,
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)
      ]),
      count: new FormControl(1, [
        Validators.required,
        Validators.pattern("^[0-9]+$"),
      ]),

    }, this.validarFormGeneral );
  }

  validarFormGeneral (g: any){

    if (g.get('price').value == '-1') g.get('price').reset(0);
    if (g.get('count').value == '') g.get('count').reset(1);

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

