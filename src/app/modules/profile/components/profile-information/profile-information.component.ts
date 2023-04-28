import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { UserModel } from 'src/app/core/models/person-model';
import { UserService } from 'src/app/modules/admin/services/user.service';
import { MIN_CEDULA, MIN_NAME, MAX_NAME, MIN_EMAIL, MAX_EMAIL, MAX_ADDRESS, MAX_TELEPHONE } from 'src/app/utils/Constants-Field';
import { validMessagesError } from 'src/app/utils/MessagesValidation';
import { typeFilterField } from 'src/app/utils/types';
import { validatorDni } from 'src/app/utils/validators/person.validator';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss']
})
export class ProfileInformationComponent implements OnInit {

  
  // esta url es la imagen por defecto tambien debe estar en list-exercises.component.ts
  // para mostrar la imagen por defecto 
  urlImgDefault = "../../../../../assets//img//Default_pfp.svg.png";
  formData: FormGroup;
  validMessage = validMessagesError;
  formDataSend: FormData = new FormData();

  userCurrent: UserModel;

  selectedFileUrl: string;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.setDataForm();
    this.formData.get('dni')?.disable();
  }
  private setDataForm() {

    this.userService.findUserCurrent().pipe(
      tap((data: any) => {
        console.log("Data: ", data);
        this.setData(data);
      }
      ),
      catchError((err) => {
        console.log("Error: ", err);
        return of(null);
      }
      )).subscribe();

  }




  private createForm() {

    this.formData = new FormGroup({
      dni: new FormControl('', [
        Validators.required,
        Validators.pattern(`^[0-9]{${MIN_CEDULA}}$`),
        validatorDni()]

      ),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(MIN_NAME),
        Validators.maxLength(MAX_NAME),
      ]),
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
      //  Cuando es nuevo ejercicos, este campo se utiliza para poder eliminar el texto del archivo que fue eliminado,
      // cuando es edicion, este campo permitara en el backend determinar si se elimino el archivo o no
      profile: new FormControl(null, []),
    });
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
  fnSubmit() {

    // this.formDataSend.delete("user");
    // Verificar si el formulario es valido
    if (this.formData.valid) {

      // console.log("this.formData.value", this.formData.value);
      const user = this.formData.value as UserModel;
      // Si el archivo  no se  modifico , envio la misma url que se envio desde el backend, de lo contrario envio null que indica que se elimino el archivo o modificado

      // user.profile = this.userCurrent.profile == this.selectedFileUrl ?
      //   this.selectedFileUrl : null;

        user.profile =this.selectedFileUrl


      // console.log("user", user);

      this.formDataSend.set("user", JSON.stringify(user));

      this.userService.update(this.formDataSend)

      .pipe(
        tap((data) => {
          console.log("data", data);
          this.toastr.info("Datos actualizados con exito");
          this.setData(data);
          this.formDataSend.delete("photo");

        }),
        catchError((err) => {
          console.log("err", err);
          this.toastr.error("Error al actualizar datos");
          return of(null);
        
        } 
      )
      ).subscribe();

    }

  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    console.log("file", "camvcio");

    const typeFileAllowd = ["jpeg", "png", "jpg"];

    // Verificar si ya exta agregada la imagen al formData
    this.formDataSend.delete("photo");

    if (file) {

      const typeFile = file.name.split(".").pop() || "";

      // Validar que sea de tipo imagen
      if (typeFileAllowd.includes(typeFile)) {

        this.formDataSend.append("photo", file);

        console.log(this.formDataSend.get("photo"))

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.selectedFileUrl = reader.result as string;
        };
      } else {

        this.toastr.warning(`Archivo  tipo ${typeFile} no permitido,  solo se aceptan imagenes en formato [ ${typeFileAllowd.join(", ")} ]`, "Advertencia");
        //  alert("formato " + file.type + " no permitido")

        this.formData.controls["profile"].reset();
      }

    } else console.log("no hay imagen seleccionada")

    // console.log(file)
  }

  deleteImg() {

    // if (this.selectedFileUrl) {

      this.selectedFileUrl = `${this.urlImgDefault}`;
      this.formDataSend.delete("photo");
      // this.formData.controls["profile"].reset();

    // }
  }

  setData(data: any) {

    this.userCurrent = data as UserModel;
    this.formData.patchValue({
      dni: data.dni,
      name: data.name,
      email: data.email,
      address: data.address,
      phone: data.phone,
      born: data.born,
    });

    this.selectedFileUrl = data.profile? data.profile : this.urlImgDefault;
  }
}
