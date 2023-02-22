import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MIN_NAME, MAX_NAME, MIN_CEDULA, MIN_EMAIL, MAX_EMAIL, MAX_ADDRESS, MAX_TELEPHONE } from 'src/app/utils/Constants-Field';
import { validMessagesError } from 'src/app/utils/MessagesValidation';

@Component({
  selector: 'app-form-customers',
  templateUrl: './form-customers.component.html',
  styleUrls: ['./form-customers.component.scss']
})
export class FormCustomersComponent implements OnInit {
  
  formData: FormGroup;  
  validMessage =  validMessagesError;

  constructor(public modal: NgbActiveModal){}

  ngOnInit(): void {
    this.createForm();
  }
  keyPresent(event: any){

  }
  private createForm() {

    this.formData = new FormGroup({
      
      
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(MIN_NAME),
        Validators.maxLength(MAX_NAME),
      ]),
      cedula: new FormControl(null, [

        Validators.pattern(`^[0-9]{${MIN_CEDULA}}$`),
      ]),
      email: new FormControl(null, [
        Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),
        Validators.minLength(MIN_EMAIL),
        Validators.maxLength(MAX_EMAIL),
      ]),
      address: new FormControl(null, [Validators.maxLength(MAX_ADDRESS)]),
      phone: new FormControl(null, [
        Validators.pattern(`^[0-9]{${MAX_TELEPHONE}}$`),
      ]),
      genero: new FormControl('N', []),
      
      born: new FormControl(null, [
        Validators.pattern("^[0-9]{4}(-|/)[0-9]{2}(-|/)[0-9]{2}$")
      ]),
    }, this.validarFormGeneral );
  }

  validarFormGeneral (g: any){

    if (g.get('email').value == '') g.get('email').reset();
    if (g.get('address').value == '') g.get('address').reset();
    if (g.get('phone').value == '') g.get('phone').reset();
    if (g.get('born').value == '') g.get('born').reset();
    if (g.get('cedula').value == '') g.get('cedula').reset();


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
