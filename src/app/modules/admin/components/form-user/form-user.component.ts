import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, catchError, map, of, pipe, tap } from 'rxjs';
import { UserSrvService, Roles } from 'src/app/services/user-srv.service';
import { MIN_CEDULA, MIN_NAME, MAX_NAME, MIN_PASSWORD, MAX_PASSWORD, MIN_EMAIL, MAX_EMAIL, MAX_ADDRESS, MAX_TELEPHONE } from 'src/app/utils/Constants-Field';
import { validMessagesError } from 'src/app/utils/MessagesValidation';
import { typeFilterField } from 'src/app/utils/types';
import { validatorDni } from 'src/app/utils/validators/person.validator';
import { UserService } from '../../services/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from 'src/app/core/models/person-model';
import { ToastrService } from 'ngx-toastr';
import { UtilAdminService } from '../../services/util-admin.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {

  formData: FormGroup;
  validMessage = validMessagesError;

  constructor(
    private userUtilService: UserSrvService,
    private userService: UserService,
    private toaster: ToastrService,
    private utilAdminService: UtilAdminService,
    public modal: NgbActiveModal) { }

  ngOnInit(): void {

    this.createForm();
    this.changeToUpperCase();
  }

  get getRoles() {
    return this.userUtilService.getRoles;
  }

  private createForm() {

    this.formData = new FormGroup({
      dni: new FormControl('', [
        Validators.required,
        Validators.pattern(`^[0-9]{${MIN_CEDULA}}$`),
        validatorDni()],
        [this.dniOrEmailValidator('DNI')]

      ),
      roles: new FormControl(Roles.ROLE_USER, []),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(MIN_NAME),
        Validators.maxLength(MAX_NAME),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(MIN_PASSWORD),
        Validators.maxLength(MAX_PASSWORD),
      ]),

      repeatPassword: new FormControl('', {
        validators: [
          Validators.required,
          this.validatorPassword()

        ],

      }),
      email: new FormControl(null, [
        Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),
        Validators.minLength(MIN_EMAIL),
        Validators.maxLength(MAX_EMAIL),]
        , [this.dniOrEmailValidator('EMAIL')]),

      address: new FormControl(null, [Validators.maxLength(MAX_ADDRESS)]),
      phone: new FormControl(null, [
        Validators.pattern(`^[0-9]{${MAX_TELEPHONE}}$`),
      ]),

      born: new FormControl(null, [
        Validators.pattern("^[0-9]{4}(-|/)[0-9]{2}(-|/)[0-9]{2}$")
      ]),
    });
  }

  private changeToUpperCase() {

    this.formData.get('name')?.valueChanges.subscribe((value) => {
      this.formData.patchValue({
        name: value.toUpperCase()
      }, { emitEvent: false })
    });

  }

  fnSubmit() {

    // Verificar si el formulario es valido
    if (this.formData.valid) {

      // Aqui consulta backend

      this.clearEmptyFields();

      // console.log("this.formData.value", this.formData.value); 


      this.userService.save(this.formData.value as UserModel)
        .pipe
        (
          tap((value) => {
            // alert("Registro guardado correctamente");
            this.modal.close(value);
            this.toaster.success("Registro guardado correctamente");
            this.utilAdminService.getSubjectReloadTableUser.next(true);
          }),
          catchError((err) => {
            console.log("err", err);

            this.modal.close();
            // alert("Error  al guardar registro");
            this.toaster.error("Error  al guardar registro");
            return of(null);
            // return throwError(err);
          })

        ).subscribe();

    } else {
      this.toaster.info("Formulario invalido");
    }

  }

  validatorPassword(): ValidatorFn {
    return (repeatPassword: AbstractControl): ValidationErrors | null => {
      if (this.formData) {
        const password = this.formData.get('password')?.value;

        if (repeatPassword.value && repeatPassword.value != password) {
          return { 'mismatch': 'Contraseñas no coinciden' }

        }
      }

      return null;

    };
  }
  

  dniOrEmailValidator(type: typeFilterField): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      let field = control.value as string;

      // type input or field y ademas solo si el usuario interactua con el control se realizen las validaciones
      if (field && (control.touched || control.dirty)) {

        if (type == 'DNI' && field.length == 10) {

          return this.userService.verifyIsExistUser(field, type)
            .pipe(
              map((value) => value ? { alreadyExist: 'Cédula ya esta registrada' } : null)
            );

        }

        if (type == 'EMAIL' && field.length >= 6) {

          return this.userService.verifyIsExistUser(field, type)
            .pipe(
              map((value) => value ? { alreadyExist: 'Email ya esta registrado' } : null)
            );

        }
      }
      // Devuelve un Observable que emite el valor null
      return of(null);

    };
  }

  private clearEmptyFields() {

    for (const key in this.formData.controls) {
      if (this.formData.controls.hasOwnProperty(key)) {
        const element = this.formData.controls[key];
        if (element.value == '') {
          element.setValue(null);
        }
      }
    }
  }
}
