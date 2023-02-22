import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from 'src/app/core/models/login-model';
import { MIN_CEDULA, MIN_PASSWORD, MAX_PASSWORD } from 'src/app/utils/Constants-Field';

@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.scss']
})
export class LoginAuthComponent implements OnInit{

  formLogin: FormGroup;
  login: Login = new Login();

  constructor() {}

  ngOnInit(): void {
    this.createForm();
  }

  onLogin() {
    if (this.formLogin.status.toUpperCase() == 'VALID') {
    
        this.login = this.formLogin.value;
        console.log(this.login);

        // Aqui consulta al backend
    }
  }

  private createForm() {
    this.formLogin = new FormGroup({
      cedula: new FormControl('', [
        Validators.required,
        Validators.minLength(MIN_CEDULA),
        Validators.maxLength(MIN_CEDULA),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(MIN_PASSWORD),
        Validators.maxLength(MAX_PASSWORD),
      ]),
    });
  }

  validMessage = {
    cedula: [
      {
        type: 'required',
        message: 'Cédula es obligatoria.',
      },
      { type: 'minlength', message: `Ingrese ${MIN_CEDULA}  caracteres.` },
      { type: 'maxlength', message: `Solo ingrese ${MIN_CEDULA}  caracteres.` },
    ],

    password: [
      {
        type: 'required',
        message: 'Contraseña es obligatoria.',
      },
      {
        type: 'minlength',
        message: `Ingrese minimo ${MIN_PASSWORD} caracteres.`,
      },
      {
        type: 'maxlength',
        message: `Solo puede ingresar hasta ${MAX_PASSWORD} caracteres.`,
      },
    ],
  };
}