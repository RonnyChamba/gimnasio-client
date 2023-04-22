import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TypePayEnum } from 'src/app/core/enum/pay-enum';
import { UtilCustomerService } from 'src/app/modules/customer/services/util-customer.service';
import { MAX_DESCRIPTION } from 'src/app/utils/Constants-Field';
import { validMessagesError } from 'src/app/utils/MessagesValidation';
import { DailyService } from '../../services/daily.service';
import { DailyAttributes } from 'src/app/core/models/daily.model';
import { Subscription, catchError, of, tap } from 'rxjs';
import { UtilFiltersService } from 'src/app/shared/services/util-filters.service';

@Component({ 
  selector: 'app-form-dailies',
  templateUrl: './form-dailies.component.html',
  styleUrls: ['./form-dailies.component.scss']
})
export class FormDailiesComponent  implements OnInit, OnDestroy {
 
  formData: FormGroup;  
  validMessage =  validMessagesError;
  @Input("ideDaily") ideDaily: number;
    
  // here add suscriptiones
  private subscription: Subscription = new Subscription();

  constructor(
    public modal: NgbActiveModal,     
    private utilCustomerService: UtilCustomerService,
    private dailyService: DailyService,
    private utilFiltersService: UtilFiltersService){}


  ngOnInit(): void {
   this.createForm();

   this.findByIde();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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


      let typeOperation = this.ideDaily ? "Actualizar" : "Guardar";
      
      // Update
      
      this.dailyService.updateOrNew( this.formData.value as DailyAttributes, this.ideDaily).pipe(

          tap(resp =>{
            console.log("Diario " + typeOperation )
            alert("Diario " + typeOperation )
            this.modal.dismiss();
            console.log(resp);
            this.utilFiltersService.eventFiltersEmit(null);
          })
          ,catchError(err =>{
            console.log("Error ejecutar " + typeOperation + " registro")
            alert("Error al ejecutar " + typeOperation + " registro")
            console.log(err);
            return of(null);
          })
        ).subscribe();
        
  
      // Aqui consulta backend
    }else alert("Campos incorrectos")
    
  }
}

