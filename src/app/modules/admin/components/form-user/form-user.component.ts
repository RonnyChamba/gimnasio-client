import { Component, Input, OnInit } from '@angular/core';
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
import { MENU_ADMIN, MENU_PADRE } from 'src/app/utils/constants-menu';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {

  formData: FormGroup;
  validMessage = validMessagesError;
  title = "Nuevo usuario";
  @Input() ideUserEdit: any;

  // se usa para cargar los menus
  perfiles: any[] = [];

  // se usa para guardar los menus seleccionados para el nuevo cliente
  perfilesSelected: any[] = [];

  // se usa para mostrar los menus que tiene el usuario al editar
  menusByUser: any[] = [];

  checkedEditarPassword = false;

  constructor(
    private userUtilService: UserSrvService,
    private userService: UserService,
    private toaster: ToastrService,
    private utilAdminService: UtilAdminService,
    public modal: NgbActiveModal) { }

  ngOnInit(): void {

    this.createForm();
    this.changeToUpperCase();
    this.loadPerfiles();
    this.setValuesFormEdit();
    this.enabledFields();
    this.title = this.ideUserEdit ? "Editar usuario" : "Nuevo usuario";
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

      this.clearEmptyFields();

      const request = this.formData.value;
      request.menus = this.perfilesSelected;
      request.editPassword = this.checkedEditarPassword;

      // No es necesario enviar el campo roles, ya que el backend esta quemado el valor ROLE_USER
      // y seteamos a null porque esta llendose un array  y el backend no lo acepta
      if (this) request.roles = null;

      console.log("request", request);
      // return;
      this.userService.save(request, this.ideUserEdit)
        .pipe
        (
          tap((value) => {
            this.modal.close(value);
            this.toaster.success(`Registro ${this.ideUserEdit ? 'Actualizado' : 'Registrado'} correctamente`);
            this.utilAdminService.getSubjectReloadTableUser.next(true);
          }),
          catchError((err) => {
            console.log("err", err);

            this.modal.close();
            this.toaster.error("Error  al guardar registro");
            return of(null);
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

        const typeAction = this.ideUserEdit ? 'UPDATE' : 'NEW';
        const ide = this.ideUserEdit ? this.ideUserEdit : null;

        if (type == 'DNI' && field.length == 10) {

          return this.userService.verifyIsExistUser(field, type, typeAction, ide)
            .pipe(
              map((value) => value ? { alreadyExist: 'Cédula ya esta registrada' } : null)
            );

        }

        if (type == 'EMAIL' && field.length >= 6) {

          return this.userService.verifyIsExistUser(field, type, typeAction, ide)
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

  private loadPerfiles() {

    this.userService.findAllMenuByNemonicoPadre(MENU_PADRE)
      .pipe(
        tap((data: any) => {
          // console.log("data", data);
          this.perfiles = data?.data || [];

          // ocultar el perfil de administrador
          this.perfiles = this.perfiles.filter((item: any) => item.nemonico != MENU_ADMIN);

          // agregar la propiedad checked para el control de los checkbox
          this.perfiles = this.perfiles.map((item: any) => {
            item.checked = false;
            return item;
          });
        }),
        catchError((err) => {
          console.log("err", err);
          return of(null);
        })
      )
      .subscribe();
  }
  private setValuesFormEdit() {
    if (this.ideUserEdit) {
      this.userService.findByIde(this.ideUserEdit).pipe(
        tap((data) => {
          console.log(data);
          this.formData.patchValue(data);

          // cargar los menus del usuario
          this.getMenusByUser();
        }),
        catchError((err) => {
          console.log("err", err);
          return of(null);
        })
      ).subscribe();
    }
  }
  fnChangePerfil(event: any) {

    if (event.target.checked) {
      this.perfilesSelected.push(event.target.value);
    } else {
      this.perfilesSelected = this.perfilesSelected.filter((item) => item != event.target.value);
    }
  }

  private getMenusByUser() {

    this.userService.findAllMenuByUser(this.ideUserEdit)
      .pipe(
        tap((data: any) => {
          // console.log("data", data);
          this.menusByUser = data?.data || [];

          // agregar la propiedad checked para el control de los checkbox
          this.perfiles = this.perfiles.map((item: any) => {
            item.checked = this.menusByUser.some((itemMenuByUser: any) => itemMenuByUser?.idMenu == item.ide);

            // si el menu esta seleccionado se agrega al array de perfiles seleccionados
            if (item.checked) {
              this.perfilesSelected.push(item.ide);
            }

            return item;
          });
        }),
        catchError((err) => {
          console.log("err", err);
          return of(null);
        })
      ).subscribe();
  }

  editarPassword(event: any) {
    event.preventDefault();

    const checked = event.target.checked;

    this.checkedEditarPassword = checked;

    if (this.checkedEditarPassword) {

      this.formData.get('password')?.enable();
      this.formData.get('repeatPassword')?.enable();

      // // update the validators
      this.formData.get('password')?.setValidators([
        Validators.required,
        Validators.minLength(MIN_PASSWORD),
        Validators.maxLength(MAX_PASSWORD),
      ]);

      this.formData.get('repeatPassword')?.setValidators([
        Validators.required,
        this.validatorPassword()

      ]);

    } else {

      // clear the values
      this.formData.patchValue({
        password: null,
        repeatPassword: null
      }, { emitEvent: false });

      // disable the password fields
      this.formData.get('password')?.disable();
      this.formData.get('repeatPassword')?.disable();

      // // remove the validators
      this.formData.get('password')?.setValidators(null);
      this.formData.get('repeatPassword')?.setValidators(null);
    }

    this.formData.get('password')?.updateValueAndValidity( { emitEvent: false });
    this.formData.get('repeatPassword')?.updateValueAndValidity( { emitEvent: false });
  }

  private enabledFields() {
    // when is edit, enable the password fields
    if (this.ideUserEdit) {
      this.formData.get('password')?.disable();
      this.formData.get('repeatPassword')?.disable();
    }
  }
}
