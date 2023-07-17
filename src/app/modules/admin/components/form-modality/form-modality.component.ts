import { Component, Input, OnInit } from '@angular/core';
import { ModalityService } from '../../services/modality.service';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { validMessagesError } from 'src/app/utils/MessagesValidation';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UtilAdminService } from '../../services/util-admin.service';

@Component({
  selector: 'app-form-modality',
  templateUrl: './form-modality.component.html',
  styleUrls: ['./form-modality.component.scss']
})
export class FormModalityComponent implements OnInit {


  @Input() ideModality: any;

  constructor(
    private modalityService: ModalityService,
    public modal: NgbActiveModal,
    private admiUtil: UtilAdminService,
    private toaster: ToastrService) { }


  formData: FormGroup;
  validMessage = validMessagesError;

  ngOnInit(): void {
    this.createForm();

    if (this.ideModality) {
      this.editForm();
    }
  }


  private editForm() {

    this.modalityService.findModalityById(this.ideModality).pipe(

      tap((value) => {
        console.log(value);
        this.formData.patchValue(value);
      })
      , catchError((error) => {

        alert("Error al cargar modalidad");
        console.log(error);
        return of(null);
      })
    ).subscribe();


  }

  private createForm() {

    this.formData = new FormGroup({
      name: new FormControl('', [
        Validators.required],
        [this.nameValidator()]),
      price: new FormControl(0, [
        Validators.required,
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)
      ]),
    });
  }

  fnSubmit() {
    console.log("Submit");

    if (this.formData.valid) {
      if (this.ideModality) {
        this.update();
      }else this.saveNew();


    } else alert("Formulario invalido");

  }

  private saveNew() {

    this.modalityService.saveModality(this.formData.value).pipe(

      tap((value) => {
        console.log(value);

        this.toaster.success("Modalidad Guardada con exito");
        // alert("Guardado con exito");
        this.modal.close(value);
        this.admiUtil.getSubjectModality.next(true);
      })
      , catchError((error) => {

        // alert("Error al guardar");
        this.toaster.error("Error al guardar", "Error");
        console.log(error);
        return of(null);
      })

    ).subscribe();

  }

  private update(){

    this.modalityService.updateModality(this.formData.value, this.ideModality).pipe(

      tap((value) => {
        console.log(value);
        // alert("Actualizado con exito");
        this.modal.close(value);
        this.toaster.success("Modalidad Actualizada con exito");
        this.admiUtil.getSubjectModality.next(true);
      })
      , catchError((error) => {

        this.toaster.error("Error al actualizar", "Error");
        // alert("Error al actualizar");
        console.log(error);
        return of(null);
      })

    ).subscribe();
  }
  nameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      let field = control.value as string;

      // type input or field y ademas solo si el usuario interactua con el control se realizen las validaciones
      if (field && (control.touched || control.dirty)) {

        return this.modalityService.existModality(field,
          this.ideModality ? this.ideModality : "")
          .pipe(
            map((value) => value ? { alreadyExist: 'Nombre ya esta registrado' } : null)
          );


      }
      // Devuelve un Observable que emite el valor null
      return of(null);

    };
  }


}
