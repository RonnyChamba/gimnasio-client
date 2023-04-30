import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CredentialUser } from 'src/app/core/models/login-model';
import { MIN_CEDULA, MIN_PASSWORD, MAX_PASSWORD } from 'src/app/utils/Constants-Field';
import { AuthService } from '../../service/auth.service';
import { TokenService } from '../../service/token.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.scss']
})
export class LoginAuthComponent implements OnInit{

  formLogin: FormGroup;
  login: CredentialUser = new CredentialUser();

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  onLogin() {
    if (this.formLogin.valid) {

        this.login = this.formLogin.value;
        // console.log(this.login);

        this.authService.onLogin(this.login).pipe(

          tap( (resp: any) => {
            console.log(resp);
            this.tokenService.setToken(resp.token);

            // Por defecto el sidebar esta cerrado
            this.tokenService.setFlagClose(true);

            this.toaster.success('Bienvenido', 'Ingreso Exitoso');
            this.router.navigate(['/']);

          })
          ,catchError( err => {
            // console.log(err);

            if (err.status == 401) { 
              this.toaster.error('Credenciales incorrectas', 'Error');
            }else {

              this.toaster.error('Error en el servidor', 'Error');
            }
            
            return of(null);
          })
        ).subscribe();

    }else {

      this.toaster.warning('Ingrese los datos correctamente', 'Advertencia');
    }
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
}
