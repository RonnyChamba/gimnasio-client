import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/modules/category/services/category.service';
import { UtilService } from 'src/app/services/util-service.service';
import { MIN_NAME, MAX_NAME, MAX_DESCRIPTION, MAX_LEVEL } from 'src/app/utils/Constants-Field';
import { validMessagesError } from 'src/app/utils/MessagesValidation';
import { ExerciseService } from '../../services/exercise.service';

import { ToastrService } from 'ngx-toastr';

import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UtilExerciseService } from '../../services/util-exercise.service';
import { ExerciseFetch } from 'src/app/core/models/exercise.model';


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
  selectedFileUrl: string;
  @Input() idExercise: number;

  exerciseEdit: ExerciseFetch;


  constructor(private utilService: UtilService,
    public modal: NgbActiveModal,
    private categoryService: CategoryService,
    private exerciseService: ExerciseService,
    private exersiceUtilService: UtilExerciseService,
    private toastr: ToastrService) { }
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

          this.selectedFileUrl = resp.url;

          this.formData.patchValue({
            name: resp.name,
            description: resp.description,
            level: resp.level,
          });

          console.log(resp.url);

          if (resp.categories.length > 0) {
            // Asigna el valor de las categorias al campo categories
            this.formData.get('categories')?.setValue(resp.categories.map(x => x.ide + ""));

            console.log(this.formData.get('categories')?.value);
          } else
            // Si no tiene categorias asigna el valor -1 al campo categories para que no se muestre ninguno
            this.formData.get('categories')?.setValue(["-1"]);



        }),
        catchError(err => {

          // console.log(err);
          this.toastr.error(err.error.message, "Error");
          return of(null);
        })
      ).subscribe();
    }

  }

  private findCategories() {


    this.categoryService.findAllSingle().subscribe(resp => {
      this.listCategories = resp;
      // console.log(resp)
      this.listCategories.unshift({ ide: "-1", name: "Ninguno" })

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

        level: new FormControl("No asignado", [Validators.maxLength(MAX_LEVEL)]),
        categories: new FormControl(["-1"], []),
      },
      this.validarFormGeneral
    );
  }

  validarFormGeneral(g: any) {
    if (g.get('description').value == '') g.get('description').reset();

    return null;
  }

  fnSubmit() {
    // Verificar si el formulario es valido
    if (this.formData.valid) {

      // Aqui consulta backend
      // console.log(this.formData.value);

      this.clearData();

      this.formDataSend.append("exercise", JSON.stringify(this.formData.value));

      console.log(this.formData.value);

      if (this.idExercise) this.updateExercise();
      else this.saveNewExercise();


    } else alert('Campos incorrectos');

  }

  private saveNewExercise() {

    this.exerciseService.save(this.formDataSend).pipe(

      // maneja el resultado aquí
      tap(resul => {
        // console.log(resul);


        this.toastr.success("Registro guardado con exito")

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

    // Si el archivo  se  modifico , envio la misma url que se envio desde el backend, de lo contrario envio null que indica que se elimino el archivo o modificado
    exercise.url = this.exerciseEdit.url == this.selectedFileUrl ?
      this.selectedFileUrl : null;

    this.formDataSend.set("exercise",  JSON.stringify(exercise));

    this.exerciseService.update(this.idExercise, this.formDataSend).pipe(

      // maneja el resultado aquí
      tap(resul => {

        this.toastr.success("Registro actualizado con exito")

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

  private clearEntryCategory() {

    let categories: string[] = this.formData.get('categories')?.value;
    console.log(categories)

    // Menos  -1 q significa la opcion ninguna, se tiene que eliminar del arreglo
    if (categories.includes("-1")) {
      // console.log("dentro")      
      categories = categories.filter(item => item != "-1");
    }

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
    const file: File = event.target.files[0];

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
        //  alert("formato " + file.type + " no permitido")

        this.formData.controls["url"].reset();
      }

    } else console.log("no hay imagen seleccionada")

    // console.log(file)
  }

  deleteImg() {

    if (this.selectedFileUrl) {

      this.selectedFileUrl = "";
      this.formDataSend.delete("photo");
      this.formData.controls["url"].reset();

    }
  }

  deleteExercise() {


    if (this.idExercise == null) {
      this.toastr.warning("No se puede eliminar un ejercicio que no existe", "Advertencia");
      return;
    }

    this.exerciseService.delete(this.idExercise).pipe(

      // maneja el resultado aquí
      tap(resul => {

        this.toastr.success("Registro eliminado con exito")

        this.modal.close();

        // refresca la lista de ejercicios
        this.exersiceUtilService.refreshExercises.next(resul);

      }),

      // maneja el error aquí
      catchError(error => {

        if (error) {

          const objError = error.error;
          this.toastr.warning(objError.message, "Advertencia")

        } else this.toastr.error("Error al eliminar el ejercicio");


        // retornamos un observable vacio para que el flujo continúe
        return of(null);
      })).subscribe(); // ejecuta el observable| es decir cuando nos suscribimos a un observable  hacemos que los operadores se ejecuten


  }
}