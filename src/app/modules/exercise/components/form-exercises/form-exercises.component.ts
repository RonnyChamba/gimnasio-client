import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/modules/category/services/category.service';
import { UtilService } from 'src/app/services/util-service.service';
import { MIN_NAME, MAX_NAME, MAX_DESCRIPTION } from 'src/app/utils/Constants-Field';
import { validMessagesError } from 'src/app/utils/MessagesValidation';
import { ExerciseService } from '../../services/exercise.service';

import { ToastrService } from 'ngx-toastr';

import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UtilExerciseService } from '../../services/util-exercise.service';
import { ExerciseFetch } from 'src/app/core/models/exercise.model';
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-form-exercises',
  templateUrl: './form-exercises.component.html',
  styleUrls: ['./form-exercises.component.scss']
})
export class FormExercisesComponent implements OnInit {
  formData: FormGroup;
  validMessage = validMessagesError;
  flagAccordion = true;
  accordioWasOpen = false;
  mapLevel: any[];
  formDataSend: FormData = new FormData();
  listCategories: any[];


  // esta url es la imagen por defecto tambien debe estar en list-exercises.component.ts
  // para mostrar la imagen por defecto 
  urlImgDefault = "../../../../../assets//img//Default_pfp.svg.png";
  selectedFileUrl: string = `${this.urlImgDefault}`;
  @Input() idExercise: number;

  exerciseEdit: ExerciseFetch;

  cancelButton = false;


  constructor(
    private utilService: UtilService,
    public modal: NgbActiveModal,
    private categoryService: CategoryService,
    private exerciseService: ExerciseService,
    private exersiceUtilService: UtilExerciseService,
    private toastr: ToastrService,
    private messageService: MessageService
    ) { }
  ngOnInit(): void {
    this.createForm();
    this.initLevel();

    this.findEditExercise();
  }

  private findEditExercise() {

  
    if (this.idExercise) {


      // Si es edicion se cargan las categorias enseguida antes de cargar el ejercicio
      this.findCategories();

      this.exerciseService.findById(this.idExercise).pipe(
        tap(resp => {

          // console.log(resp);

          this.exerciseEdit = resp;

          console.log(this.exerciseEdit);
          this.selectedFileUrl = resp.url ? resp.url : `${this.urlImgDefault}`;

          this.formData.patchValue({
            name: resp.name,
            description: resp.description,
            level: resp.level,

            // cada ahora solo se puede asignar una categoria, por eso se toma la primera categoria
            // si no hay categorias el back devuelve un array vacio
            categories: !resp.categories || resp.categories.length<1? "": resp.categories[0].ide + ""
          });
        }),
        catchError(err => {

          // console.log(err);
          this.toastr.error(err, "Error");
          return of(null);
        })
      ).subscribe();
    }

  }

  private findCategories() {


    this.categoryService.findAllSingle().subscribe(resp => {
      this.listCategories = resp;
      // console.log(resp)
      // this.listCategories.unshift({ ide: "-1", name: "Ninguno" })

    })
  }
  private initLevel() {

    this.mapLevel = this.utilService.getMapLevel;
  }
  private createForm() {
    this.formData = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(MIN_NAME),
          Validators.maxLength(MAX_NAME),
        ]),

        description: new FormControl(null, [
          Validators.maxLength(MAX_DESCRIPTION),
        ]),

        //  Cuando es nuevo ejercicos, este campo se utiliza para poder eliminar el texto del archivo que fue eliminado,
        // cuando es edicion, este campo permitara en el backend determinar si se elimino el archivo o no
        url: new FormControl(null, []),

        level: new FormControl("No asignado", []),
        categories: new FormControl("", []),
      },
      this.validarFormGeneral
    );
  }

  validarFormGeneral(g: any) {
    if (g.get('description').value == '') g.get('description').reset();

    return null;
  }

  fnSubmit() {

    // console.log(this.formData.value);

    // Verificar si el formulario es valido
    if (this.formData.valid) {


      this.clearData();

      // console.log(this.formData.value);

      this.formDataSend.append("exercise", JSON.stringify(this.formData.value));

      console.log(this.formData.value);

      if (this.idExercise) this.updateExercise();
      else this.saveNewExercise();


    } else  this.toastr.warning("Formulario invalido", "Advertencia");

  }

  private saveNewExercise() {

    this.exerciseService.save(this.formDataSend).pipe(

      // maneja el resultado aquí
      tap(resul => {
        // console.log(resul);


        this.toastr.info("Registro guardado correctamente")

        this.modal.close();

        // refresca la lista de ejercicios
        this.exersiceUtilService.refreshExercises.next(resul);

      }),

      // maneja el error aquí
      catchError(error => {

        if (error) {

          const objError = error.error;

          // devuelve un observable de error para que el flujo continúe
          this.toastr.warning(objError.message, "Advertencia")



        } else this.toastr.error("Error al registrar el ejercicio");


        // retornamos un observable vacio para que el flujo continúe
        return of(null);
      })


    ).subscribe(); // ejecuta el observable| es decir cuando nos suscribimos a un observable  hacemos que los operadores se ejecuten

  }

  private updateExercise() {

    // console.log(this.selectedFileUrl);
    // console.log(this.formDataSend);



    const exercise = this.formData.value;


    // Asigna la url del archivo seleccionado o el valor por defecto si no se selecciono ningun archivo o se elimino el archivo
    exercise.url = this.selectedFileUrl;

    this.formDataSend.set("exercise", JSON.stringify(exercise));

    this.exerciseService.update(this.idExercise, this.formDataSend).pipe(

      // maneja el resultado aquí
      tap(resul => {

        this.toastr.info("Registro actualizado correctamente")

        this.modal.close();

        // refresca la lista de ejercicios
        this.exersiceUtilService.refreshExercises.next(resul);

      }),

      // maneja el error aquí
      catchError(error => {

        if (error) {

          const objError = error.error;

          // devuelve un observable de error para que el flujo continúe
          this.toastr.warning(objError.message, "Advertencia")

        } else this.toastr.error("Error al actualizar el ejercicio");


        // retornamos un observable vacio para que el flujo continúe
        return of(null);
      })).subscribe(); // ejecuta el observable| es decir cuando nos suscribimos a un observable  hacemos que los operadores se ejecuten
  }

  private clearData() {

    this.clearEntryCategory();

    // if (this.formData.get("level")?.value =="") this.formData.get("level")?.setValue("No asignado");

    // delete value of exercise by sure 
    this.formDataSend.delete("exercise");

  }
  /**
   * Formatear categorias
       * Al backend se envia un array de categorias, si no selecciono ninguna categoria, se envia un array vacio
       */
  private clearEntryCategory() {

    let categories: any = this.formData.get('categories')?.value;
    // console.log(categories)

    // Si selecciono la opcion Ninguna , asigno un array vacio
    if (!categories) categories = [];
    // Si selecciono una categoria, asigno un array con la categoria seleccionada
    else 
      categories = [categories];
  

    // Actualizar valores de las categorias
    this.formData.patchValue({
      categories
    })

    // console.log(categories)


  }
  onAccordion() {
    this.flagAccordion = !this.flagAccordion;



    // Si es nuevo ejercicio que haga la consulta, porque si es edicion no es necesario hacer la consulta
    // porque ya se hizo en el metodo editExercise
    if (!this.idExercise) {
      // Solo se ejecuta una vez, cuando se abre el acordeon por primera vez
      if (!this.accordioWasOpen) {
        this.findCategories();
        this.accordioWasOpen = true;
      }

    }

  }

  onFileSelected(event: any) {

    // console.log("dentro")
    const file: File = event.target.files[0];

    const typeFileAllowd = ["jpeg", "png", "jpg"]
    if (file) {

      const typeFile = file.name.split(".").pop() || "";

      // Validar que sea de tipo imagen
      if (typeFileAllowd.includes(typeFile)) {

        // Verificar si ya exta agregada la imagen al formData
        this.formDataSend.delete("photo");

        this.formDataSend.append("photo", file);

        // console.log(this.formDataSend.get("photo"))

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.selectedFileUrl = reader.result as string;
        };
      } else {

        this.toastr.warning(`Archivo  tipo ${typeFile} no permitido,  solo se aceptan imagenes en formato [ ${typeFileAllowd.join(", ")} ]`, "Advertencia");

        this.formData.controls["url"].reset();
      }

    } else console.log("no hay imagen seleccionada")

  }

  deleteImg() {

    this.selectedFileUrl = `${this.urlImgDefault}`;
    this.formDataSend.delete("photo");
  }
  onUpload(event: any) {

    console.log(event);


    const file: File = event.files[0];

    const typeFileAllowd = ["jpeg", "png", "jpg"]
    if (file) {

      const typeFile = file.name.split(".").pop() || "";

      // Validar que sea de tipo imagen
      if (typeFileAllowd.includes(typeFile)) {

        // Verificar si ya exta agregada la imagen al formData
        this.formDataSend.delete("photo");

        this.formDataSend.append("photo", file);

        console.log(this.formDataSend.get("photo"))

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.selectedFileUrl = reader.result as string;
        };
      } else {

        this.toastr.warning(`Archivo  tipo ${typeFile} no permitido,  solo se aceptan imagenes en formato [ ${typeFileAllowd.join(", ")} ]`, "Advertencia");

        this.formData.controls["url"].reset();
      }

    } else console.log("no hay imagen seleccionada")

  }
}