import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from 'src/app/services/util-service.service';
import { MIN_NAME, MAX_NAME, MAX_DESCRIPTION, MAX_LEVEL } from 'src/app/utils/Constants-Field';
import { TypeExpenseEnum } from 'src/app/utils/enum/enumLevel';
import { validMessagesError } from 'src/app/utils/MessagesValidation';

@Component({
  selector: 'app-form-expense',
  templateUrl: './form-expense.component.html',
  styleUrls: ['./form-expense.component.scss']
})
export class FormExpenseComponent  implements OnInit{
  
  formData: FormGroup;
  validMessage = validMessagesError;
  typeExpenses:any = [];

  
  constructor( public modal: NgbActiveModal, private utilService: UtilService ){}
  ngOnInit(): void {
    this.createForm();
    this.typeExpenses = this.utilService.typeExpenses;
    // this.formData.get('value')?.valueChanges.subscribe (item =>{
    //   console.log("Valor: " + typeof( item));

    //   if (item ==null ||  typeof(item)== 'object' ){

    //     this.formData.get('value')?.setValue(0);
    //   }
    // })
  
  }

  private createForm() {
    this.formData = new FormGroup(
      {
        type: new FormControl(TypeExpenseEnum.OTROS, [
          Validators.required,
        ]),

        value: new FormControl(0, [
         Validators.required,
         Validators.pattern(/^[0-9]+(.[0-9]+)?$/)
        ]),

        description: new FormControl(null, [Validators.maxLength(MAX_DESCRIPTION)]),
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

    if (this.formData.status.toUpperCase() == 'VALID') {

  // Si level esta '' indica que no eligio ningun nivel y setear a null ese valor 

      // Aqui consulta backend
      console.log(this.formData.value);


      
    } else alert('Campos incorrectos');

  }

}
