import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CredentialUser } from 'src/app/core/models/login-model';
import { MIN_CEDULA, MIN_PASSWORD, MAX_PASSWORD } from 'src/app/utils/Constants-Field';
import { AuthService } from '../../service/auth.service';
import { TokenService } from '../../service/token.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { URL_INICIO } from 'src/app/utils/constants-url-path';

@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.scss']
})
export class LoginAuthComponent implements OnInit {

  formLogin: FormGroup;
  login: CredentialUser = new CredentialUser();
  miliseconds = 1500;
  tipoLogin: boolean = true;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private toaster: ToastrService,
    private router: Router,
    private messageServie: MessageService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }
  private createForm() {
    this.formLogin = new FormGroup({
      username: new FormControl('', [
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
  onLogin() {
    if (this.formLogin.valid) {

      if (this.tipoLogin) {
        this.loginUsuario();
      } else this.loginClientes();
    } else {
      this.toaster.warning('Ingrese los datos correctamente', 'Advertencia');
    }
  }
  private loginUsuario() {

    this.messageServie.loadingGeneral(true, 'Ingresando al sistema, por favor espere...');

    setTimeout(() => {
      this.login = this.formLogin.value;

      this.authService.onLogin(this.login).pipe(

        tap((resp: any) => {
          this.tokenService.setToken(resp.token);

          // Por defecto el sidebar esta cerrado
          this.tokenService.setFlagClose(true);

          this.messageServie.loading(false);

          this.router.navigate([URL_INICIO]);

        })
        , catchError(err => {

          if (err.status == 401) {

            this.messageServie.mensajeErrorLogout("Credenciales incorrectas");
          } else {

            this.messageServie.mensajeErrorLogout("Ocurrio un error al ingresar, comuniquese con el administrador del sistema.");
          }
          return of(null);
        })
      ).subscribe();


    }, this.miliseconds);
  }

  private loginClientes() {

    
  }


  validMessage = {
    username: [
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

  clickTipoLogin(tipoBoolean: boolean) {
    this.tipoLogin = tipoBoolean;
    if (this.tipoLogin) {

      this.formLogin.get("password")?.addValidators([
        Validators.required,
        Validators.minLength(MIN_PASSWORD),
        Validators.maxLength(MAX_PASSWORD)]);
    } else {
      this.formLogin.get("password")?.clearValidators();
    }
    this.formLogin.get("password")?.markAsUntouched();
    this.formLogin.get("username")?.markAsUntouched();
    this.formLogin.get("password")?.updateValueAndValidity({});
    this.formLogin.get("username")?.updateValueAndValidity({});





  }
}
