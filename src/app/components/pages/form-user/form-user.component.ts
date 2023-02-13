import { Component, OnInit } from '@angular/core';
import {
  MAX_ADDRESS,
  MAX_EMAIL,
  MIN_NAME,
  MAX_NAME,
  MAX_TELEPHONE,
  MAX_PASSWORD,
  MIN_CEDULA,
  MIN_EMAIL,
  MIN_PASSWORD,
} from '../../../utils/Constants-Field';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Roles, UserSrvService } from 'src/app/services/user-srv.service';
import {validMessagesError} from '../../../utils/MessagesValidation'

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})

export class FormUserComponent implements OnInit {
  
  formData: FormGroup;  
  validMessage =  validMessagesError;

  constructor(private userService: UserSrvService) {}
  ngOnInit(): void {

    this.createForm();
  }


  get getRoles(){
    return this.userService.getRoles;
  }

  keyPresent(event: any){

  }
  private createForm() {

    this.formData = new FormGroup({
      cedula: new FormControl('', [
        Validators.required,
         Validators.minLength(MIN_CEDULA),
         Validators.maxLength(MIN_CEDULA)
        
      ]),
      rol: new FormControl(Roles.ROLE_USER, []),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(MIN_NAME),
        Validators.maxLength(MAX_NAME),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(MIN_PASSWORD),
        Validators.maxLength(MAX_PASSWORD),
        Validators.pattern(/[A-Z]{1}/),
      ]),

      repeatPassword: new FormControl('',{
        validators : [
          Validators.required,
      
        ],
         
      }),
      email: new FormControl(null, [
        Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),
        Validators.minLength(MIN_EMAIL),
        Validators.maxLength(MAX_EMAIL),
      ]),
      address: new FormControl(null, [Validators.maxLength(MAX_ADDRESS)]),
      phone: new FormControl(null, [
        Validators.pattern(`^[0-9]{${MAX_TELEPHONE}}$`),
      ]),

      born: new FormControl(null, [
        Validators.pattern("^[0-9]{4}(-|/)[0-9]{2}(-|/)[0-9]{2}$")
      ]),
    } , this.validarRepeatPassword);
  }

  fnSubmit() {

    // Verificar si el formulario es valido
    if (this.formData.status.toUpperCase()=='VALID'){
      console.log(this.formData.value);

      // Aqui consulta backend
    }else alert("Campos incorrectos")
    
  }

  

  validarRepeatPassword (g: any){

    if (g.get('email').value == '') g.get('email').reset();
    if (g.get('address').value == '') g.get('address').reset();
    if (g.get('phone').value == '') g.get('phone').reset();
    if (g.get('born').value == '') g.get('born').reset();



    return g.get('password').value === g.get('repeatPassword').value
    ? null : {'mismatch': true};

  }
}
