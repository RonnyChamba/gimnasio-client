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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-dailies',
  templateUrl: './form-dailies.component.html',
  styleUrls: ['./form-dailies.component.scss']
})
export class FormDailiesComponent implements OnInit, OnDestroy {

  formData: FormGroup;
  validMessage = validMessagesError;
  @Input("ideDaily") ideDaily: number;

  // here add suscriptiones
  private subscription: Subscription = new Subscription();

  constructor(
    public modal: NgbActiveModal,
    private utilCustomerService: UtilCustomerService,
    private dailyService: DailyService,
    private toaster: ToastrService,
    private utilFiltersService: UtilFiltersService) { }


  ngOnInit(): void {
    this.createForm();
    this.listenerEventsField();
    this.setTotalInit();
    this.disabledField();

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
      total: new FormControl('', [
        Validators.required,
      ]),
      typePay: new FormControl(TypePayEnum.EFECTIVO, [Validators.required]),

    }, this.validarFormGeneral);
  }

  private findByIde() {

    if (this.ideDaily) {

      console.log(" es para update")

      this.dailyService.findByIde(this.ideDaily).subscribe(resp => {

        this.formData.patchValue(resp)
      })



    } else console.log("es un nuevo registro")


  }

  get listTypePay(): TypePayEnum[] {
    return this.utilCustomerService.getListTypePayEnum;
  }

  validarFormGeneral(g: any) {

    if (g.get('price').value == '-1') g.get('price').reset(0);
    if (g.get('amount').value == '') g.get('amount').reset(1);

    return null;

  }
  fnSubmit() {

    // Verificar si el formulario es valido
    if (this.formData.valid) {


      let typeOperation = this.ideDaily ? "Actualizar" : "Guardar";

      // Update

      const request = this.formData.value as DailyAttributes;
      request.total = this.formData.get("total")?.value;
  
      this.dailyService.updateOrNew(request, this.ideDaily).pipe(

        tap(resp => {
          console.log("Diario " + typeOperation)
          // alert("Diario " + typeOperation )
          this.modal.dismiss();
          // console.log(resp);

          this.toaster.info(`Diario ${this.ideDaily ? 'Actualizado' : 'Registrado'} con exito `)
          this.utilFiltersService.eventFiltersEmit(null);
        })
        , catchError(err => {
          console.log("Error ejecutar " + typeOperation + " registro")
          // alert("Error al ejecutar " + typeOperation + " registro")
          this.toaster.error(`Error al ${this.ideDaily ? 'Actualizar' : 'Registrar'} el diario`);
          console.log(err);
          return of(null);
        })
      ).subscribe();


      // Aqui consulta backend
    } else alert("Campos incorrectos")

  }

  /**
   * Desabilita campos del formulario
   */
  private disabledField() {

    this.formData.get("total")?.disable();
  }

  /**
   * Escucha eventos de los campos del formulario
   */
  private listenerEventsField() {


    this.formData.get("price")?.valueChanges.subscribe(price => {

      let total = 0;
      if (price) {

        // obtener la cantidad

        total = price;

        const cantidad = this.formData.get("amount")?.value;
        if (cantidad) {
          total = price * cantidad;
        }
        this.formData.get("total")?.setValue(total);


      } else this.formData.get("total")?.setValue("");
    })

    this.formData.get("amount")?.valueChanges.subscribe(cantidad => {

      if (cantidad) {

        const price = this.formData.get("price")?.value;

        if (price) {
          const total = cantidad * price;
          this.formData.get("total")?.setValue(total);
        }
        // si esta vacio el precio
      } else {
        const price = this.formData.get("price")?.value;
        this.formData.get("total")?.setValue(price);
      }
    })

  }

  /**
   * Metodo que se ejecuta al iniciar el formmulario, calcula el total de inicio
   */
  private setTotalInit() {


    const price = this.formData.get("price")?.value;
    const cantidad = this.formData.get("amount")?.value;

    let total: any;

    if (price) {
      if (cantidad) total = price * cantidad;
    }

    // console.log(total);
    this.formData.get("total")?.setValue(total || "");

  }
}

