import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MIN_NAME, MAX_NAME, MIN_CEDULA, MIN_EMAIL, MAX_EMAIL, MAX_ADDRESS, MAX_TELEPHONE } from 'src/app/utils/Constants-Field';
import { validMessagesError } from 'src/app/utils/MessagesValidation';

@Component({
  selector: 'app-form-daily',
  templateUrl: './form-daily.component.html',
  styleUrls: ['./form-daily.component.scss']
})
export class FormDailyComponent implements OnInit {
 
  formData: FormGroup;  
  validMessage =  validMessagesError;
  
  ngOnInit(): void {
   this.createForm();
  }




  private createForm() {

    this.formData = new FormGroup({
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(MIN_NAME),
        Validators.maxLength(MAX_NAME),
      ]),
      price: new FormControl(2.00, [
        // Validators.pattern(`^[0-9]{${MIN_CEDULA}}$`),
      ]),
      count: new FormControl(1, [
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
