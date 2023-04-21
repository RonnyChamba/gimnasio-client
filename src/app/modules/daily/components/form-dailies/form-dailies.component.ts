import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TypePayEnum } from 'src/app/core/enum/pay-enum';
import { UtilCustomerService } from 'src/app/modules/customer/services/util-customer.service';
import { MAX_DESCRIPTION } from 'src/app/utils/Constants-Field';
import { validMessagesError } from 'src/app/utils/MessagesValidation';
import { DailyService } from '../../services/daily.service';
import { DailyAttributes } from 'src/app/core/models/daily.model';

@Component({ 
  selector: 'app-form-dailies',
  templateUrl: './form-dailies.component.html',
  styleUrls: ['./form-dailies.component.scss']
})
export class FormDailiesComponent  implements OnInit {
 
  formData: FormGroup;  
  validMessage =  validMessagesError;
  @Input("ideDaily") ideDaily: number;

  constructor(public modal: NgbActiveModal,     
    private utilCustomerService: UtilCustomerService,
    private dailyService: DailyService){}
  ngOnInit(): void {
   this.createForm();

   this.findByIde();
  }

  private createForm() {

    this.formData = new FormGroup({
      description: new FormControl('Diario Normal', [
        Validators.required,
        Validators.maxLength(MAX_DESCRIPTION),
      ]),
      price: new FormControl(2.00, [
        Validators.required,
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/)
      ]),
      amount: new FormControl(1, [
        Validators.required,
        Validators.pattern("^[0-9]+$"),
      ]),
      typePay: new FormControl(TypePayEnum.EFECTIVO, [Validators.required]),

    }, this.validarFormGeneral );
  }

  private findByIde(){

    if (this.ideDaily) {
      
      console.log(" es para update")

      this.dailyService.findByIde(this.ideDaily).subscribe(resp =>{
      
        this.formData.patchValue(resp)
      })



    }else console.log("es un nuevo registro")


  }

  get listTypePay(): TypePayEnum[] {
    return this.utilCustomerService.getListTypePayEnum;
  }

  validarFormGeneral (g: any){

    if (g.get('price').value == '-1') g.get('price').reset(0);
    if (g.get('amount').value == '') g.get('amount').reset(1);

    return null;

  }
  fnSubmit() {

    // Verificar si el formulario es valido
    if (this.formData.valid){

      // Update
      if (this.ideDaily) {
        this.dailyService.update( this.ideDaily, this.formData.value as DailyAttributes).subscribe(resp =>{

    
          console.log("Diario Actualizado")
          console.log(resp);
        })

        // new Daily
      }else {

        this.dailyService.save(this.formData.value as DailyAttributes).subscribe(resp =>{

    
          console.log("Diario guardado")
          console.log(resp);
        })


      }


  

      // Aqui consulta backend
    }else alert("Campos incorrectos")
    
  }
}

