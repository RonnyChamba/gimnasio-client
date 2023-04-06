import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/modules/category/services/category.service';
import { UtilService } from 'src/app/services/util-service.service';
import { MIN_NAME, MAX_NAME, MAX_DESCRIPTION, MAX_LEVEL } from 'src/app/utils/Constants-Field';
import { validMessagesError } from 'src/app/utils/MessagesValidation';
import { ExerciseService } from '../../services/exercise.service';

import { ToastrService } from 'ngx-toastr';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-form-exercises',
  templateUrl: './form-exercises.component.html',
  styleUrls: ['./form-exercises.component.scss']
})
export class FormExercisesComponent  implements OnInit {
  formData: FormGroup;
  validMessage = validMessagesError;
  flagAccordion = true;
  mapLevel: any[];

  formDataSend: FormData = new FormData();

  listCategories : any[];

  constructor( private utilService: UtilService,
     public modal: NgbActiveModal,
     private categoryService: CategoryService,
     private exerciseService: ExerciseService,
     private toastr: ToastrService) {}
  ngOnInit(): void {
    this.createForm();
    this.initLevel();
    this.findCategories();



  }

  private findCategories(){


    this.categoryService.findAllSingle().subscribe(resp=> {
    this.listCategories = resp;
    console.log(resp)
    this.listCategories.unshift({ide:"-1", name: "Ninguno"})

    })
  }
  private initLevel() {
    
     this.mapLevel =  this.utilService.getMapLevel;
    //  this.mapLevel.unshift( {key: "",  value: "Ninguno"});
     
    //  this.mapLevel.set(null, "Seleccione categoria");
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

        level: new FormControl("", [Validators.maxLength(MAX_LEVEL)]),
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
      console.log(this.formData.value);
      
     this.clearData();
     

      this.formDataSend.append("exercise", JSON.stringify(this.formData.value));

      console.log(this.formData.value);

    
      this.exerciseService.save(this.formDataSend).pipe(
        
        catchError(error => {
          // maneja el error aquí
          console.error(error);
          // devuelve un observable de error para que el flujo continúe
        
          this.toastr.error("Error al ingresar")

          return throwError('Algo salió mal');
        })
      ).subscribe(resul =>{


        console.log(resul);
        this.toastr.success("Registro guardado con exito")
      })

      
      // this.exerciseService.save(this.formDataSend).subscribe(resp =>{
      //   console.log(resp)
      //   this.toastr.success('Ejercicio Gurdado', 'Toastr fun!');
      // })

      
    } else alert('Campos incorrectos');

  }

  private clearData(){

    this.clearEntryCategory();

    if (this.formData.get("level")?.value =="") this.formData.get("level")?.setValue(null);
    

  }

  private clearEntryCategory(){

    let categories:string[] = this.formData.get('categories')?.value;

    // Menos  -1 q significa la opcion ninguna, se tiene que eliminar del arreglo
    if (categories.includes("-1")) {
      // console.log("dentro")      
      categories = categories.filter(item => item !="-1");
    }

    // Actualizar valores de las categorias
    this.formData.patchValue({
      categories
    })

    // console.log(categories)


  }
  onAccordion() {
    this.flagAccordion = !this.flagAccordion;
  }

  onFileSelected(event: any){
    const file: File = event.target.files[0];
    
      if (file) {

        // Validar que sea de tipo imagen
       if  (file.type=="image/jpeg"  
        || file.type=="image/png"
        || file.type=="image/jpg" ) {


          // Verificar si ya exta agregada la imagen al formData
          this.formDataSend.delete("photo");

          this.formDataSend.append("photo", file);
        }else alert("formato " + file.type + " no permitido")
  
      }else console.log("no hay imagen seleccionada")

    console.log(file)
  }
}