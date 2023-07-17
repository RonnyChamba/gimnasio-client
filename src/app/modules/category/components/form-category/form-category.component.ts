import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MAX_DESCRIPTION } from 'src/app/utils/Constants-Field';
import { validMessagesError } from 'src/app/utils/MessagesValidation';
import { CategoryService } from '../../services/category.service';
import { CategoryAttribute } from 'src/app/core/models/category.model';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { UtilFiltersService } from 'src/app/shared/services/util-filters.service';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss']
})
export class FormCategoryComponent  implements OnInit {
  
   
  formData: FormGroup; 
  validMessage =  validMessagesError;
  @Input("ideCategory") ideCategory: number;
  
  constructor(public modal: NgbActiveModal,
    private categoryService: CategoryService,
    private utilFiltersService: UtilFiltersService,
    private toaster: ToastrService
    ){}
  ngOnInit(): void {
    this.createForm();
    this.findByIde();
    
  }

  private createForm() {

    this.formData = new FormGroup({
      description: new FormControl("", [
        Validators.maxLength(MAX_DESCRIPTION),
      ]),
      name: new FormControl("", [
        Validators.required], [this.nameExistsValidator()]),
  

    }, this.validarFormGeneral );
  }

  private findByIde(){

    if (this.ideCategory) {
      
      console.log(" es para update")

      this.categoryService.findByIde(this.ideCategory).pipe(

        tap(res => {

          console.log(res)
          this.formData.patchValue(res)
        }),
        catchError(error => {
          console.log(error)
          this.toaster.error(`${error.error.message}`, "Error")
          return of(null);
        })
      
      ).subscribe();
      
    }else console.log("es un nuevo registro")


  }
  
  validarFormGeneral (g: any){

    if (g.get('name').value == '') g.get('name').reset();

    return null;

  }
  fnSubmit() {

    // Verificar si el formulario es valido
    if (this.formData.valid){

        this.categoryService.persistCategory(this.ideCategory,  this.formData.value as CategoryAttribute).pipe(
          
          tap(res => {

            this.toaster.info(`Categoria ${this.ideCategory? 'actualizada': 'registrada'} exitosamente`)
            this.modal.close();
            this.utilFiltersService.eventFiltersEmit(null);
          }), 
          catchError(error => {
            console.log(error)
            this.toaster.error(`${error.error.message}`, "Error")
            return of(null);
          })
        ).subscribe();
        
    }else this.toaster.warning("Formulario invalido", "Advertencia")    
  }

  nameExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {                                                                                                                                                                                                                                                                                                                                                                                                           
      let field = control.value as string;

      // type input or field y ademas solo si el usuario interactua con el control se realizen las validaciones
      if (field && (control.touched || control.dirty)) {

        if (field.length >= 1) {

          return this.categoryService.existsByName(field, this.ideCategory)
            .pipe(
              map((value) => value ? { alreadyExist: 'Categoria ya esta registrada' } : null)
            );
        }
      }
      // Devuelve un Observable que emite el valor null
      return of(null);

    };
  }


}
