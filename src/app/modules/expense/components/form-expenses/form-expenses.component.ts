import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TypePayEnum } from 'src/app/core/enum/pay-enum';
import { UtilService } from 'src/app/services/util-service.service';
import { MAX_DESCRIPTION } from 'src/app/utils/Constants-Field';
import { TypeExpenseEnum } from 'src/app/utils/enum/enumLevel';
import { validMessagesError } from 'src/app/utils/MessagesValidation';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-form-expenses',
  templateUrl: './form-expenses.component.html',
  styleUrls: ['./form-expenses.component.scss']
})
export class FormExpensesComponent implements OnInit{
  
  formData: FormGroup;
  validMessage = validMessagesError;
  typeExpenses:any = [];

  @Input("ideExpense") ideExpense: number;

  
  constructor( public modal: NgbActiveModal, 
    private utilService: UtilService,
    private expenseService: ExpenseService ){}

  ngOnInit(): void {
    this.createForm();
    this.typeExpenses = this.utilService.typeExpenses;
    this.findByIde();
  
  }

  private findByIde(){

    if (this.ideExpense) {
      
      console.log(" es para update")

      this.expenseService.findByIde(this.ideExpense).subscribe(resp =>{
      
        this.formData.patchValue(resp)
      })



    }else console.log("es un nuevo registro")


  }

  get listTypePay () : TypePayEnum[]{

    return this.utilService.getListTypePayEnum;
  }


  private createForm() {
    this.formData = new FormGroup(
      {
        type: new FormControl(TypeExpenseEnum.OTROS, [
          Validators.required,
        ]),

        price: new FormControl(0, [
         Validators.required,
         Validators.pattern(/^[0-9]+(.[0-9]+)?$/)
        ]),

        typePay: new FormControl(TypePayEnum.EFECTIVO, [Validators.required]),

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

    if (this.formData.valid) {

      console.log(this.formData.value);

      // actualizar registro gasto
      if (this.ideExpense){


        this.expenseService.update(this.ideExpense, this.formData.value).subscribe(resp =>{

          alert("registro actualizado")
          console.log(resp)
        })
        // nuevo gasto
      }else {

        this.expenseService.save(this.formData.value).subscribe(resp=>{

          alert("registro diario guardado")
          console.log(resp)
          
        })

      }      
    } else alert('Campos incorrectos');

  }

}
