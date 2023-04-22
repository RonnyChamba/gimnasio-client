import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MAX_DESCRIPTION } from 'src/app/utils/Constants-Field';
import { validMessagesError } from 'src/app/utils/MessagesValidation';
import { CategoryService } from '../../services/category.service';
import { CategoryAttribute } from 'src/app/core/models/category.model';

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
    private categoryService: CategoryService){}
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
        Validators.required,
      ]),
  

    }, this.validarFormGeneral );
  }

  private findByIde(){

    if (this.ideCategory) {
      
      console.log(" es para update")

      this.categoryService.findByIde(this.ideCategory).subscribe(resp =>{
      
        this.formData.patchValue(resp)
      })



    }else console.log("es un nuevo registro")


  }
  
  validarFormGeneral (g: any){

    if (g.get('name').value == '') g.get('name').reset();

    return null;

  }
  fnSubmit() {

    // Verificar si el formulario es valido
    if (this.formData.valid){

      // Update
      if (this.ideCategory) {
        this.categoryService.update( this.ideCategory, this.formData.value as CategoryAttribute).subscribe(resp =>{

    
          console.log("Categoria Actualizado")
          console.log(resp);
        })

        // new Daily
      }else {

        console.log("es un nuevo registro")
        console.log(this.formData.value)
        this.categoryService.save(this.formData.value as CategoryAttribute).subscribe(resp =>{

    
          console.log("Categoria guardado")
          console.log(resp);
        })
        
      }


      // Aqui consulta backend
    }else alert("Campos incorrectos")
    
  }

}
