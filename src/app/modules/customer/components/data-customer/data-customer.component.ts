import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, firstValueFrom, of, Subscription, tap } from 'rxjs';
import { Customer } from 'src/app/core/models/customer-model';
import {
  MAX_ADDRESS,
  MAX_EMAIL,
  MAX_NAME,
  MAX_TELEPHONE,
  MIN_CEDULA,
  MIN_EMAIL,
  MIN_NAME,
} from 'src/app/utils/Constants-Field';
import {
  validaDateBorn,
  validatorDni,
} from 'src/app/utils/validators/person.validator';
import Swal from 'sweetalert2';
import { CustomerService } from '../../services/customer.service';
import { messagesErrorCustomer } from '../../util/MessageValidationCustomer';
import { dniOrEmailValidator } from '../../util/validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-data-customer',
  templateUrl: './data-customer.component.html',
  styleUrls: ['./data-customer.component.scss'],
})
export class DataCustomerComponent implements OnInit, OnDestroy {
  // here add suscriptiones
  private subscription: Subscription = new Subscription();

  formData: FormGroup;
  validMessage = messagesErrorCustomer;

  /**
   * Id del cliente actual, es necesario para pasar el ide al validador asincrono,
   */
  @Input() idCustomer: number;

  @Output() customerEvent = new EventEmitter<Customer>();

  private customerCurrent: Customer;

  constructor(
    private customerService: CustomerService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    // console.log('en data');
    this.createForm();
    this.findCustomer();
    this.addSubscriptions();
  }

  private addSubscriptions() {

  }

  private findCustomer() {
    this.customerService.findByIde(this.idCustomer).subscribe((resp) => {
      this.customerCurrent = resp as Customer;
      this.refresfData();
    });
  }

  ngOnDestroy(): void {
    // UnSubcribe, this is necesary becaouse the subcripciones se repiten
    this.subscription.unsubscribe();

    // console.log("se describe")
  }

  private createForm() {
    this.formData = new FormGroup({
      // No se modifica el ide, nos servira para actualizar
      ide: new FormControl(null, [Validators.required]),
      codInterno: new FormControl(null, [Validators.required]),
      dni: new FormControl(
        null,
        [Validators.pattern(`^[0-9]{${MIN_CEDULA}}$`), validatorDni()],
        [dniOrEmailValidator(this.customerService, 'DNI', this.idCustomer)]
      ),

      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(MIN_NAME),
        Validators.maxLength(MAX_NAME),
      ]),

      phone: new FormControl(null, [
        Validators.pattern(`^[0-9]{${MAX_TELEPHONE}}$`),
      ]),

      email: new FormControl(
        null,
        [
          Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'),
          Validators.minLength(MIN_EMAIL),
          Validators.maxLength(MAX_EMAIL),
        ],
        [dniOrEmailValidator(this.customerService, 'EMAIL', this.idCustomer)]
      ),

      genero: new FormControl('N', []),

      address: new FormControl(null, [Validators.maxLength(MAX_ADDRESS)]),

      born: new FormControl(null, [
        Validators.pattern('^[0-9]{4}(-|/)[0-9]{2}(-|/)[0-9]{2}$'),
        validaDateBorn(),
      ]),
    });
  }

  async fnSubmit() {
    this.setNullEmptyValues();

    console.log(this.formData.controls);
    if (this.formData.valid) {
      let customerNewData = this.formData.value as Customer;

      try {
        // Si no registra su dni, verificamos si el nuevo nombre ya existe en otro registro
        if (!customerNewData.dni) {
          const nameIsExist = await this.validNameIsExist();

          // Informar con un mensaje al usuario
          if (nameIsExist) {
            this.preveUpdateWhenNameExists(customerNewData);
            return;
          }
        }

        console.log('sin dni');
        // Guardar directamente el registro
        this.updateData(customerNewData);
      } catch (error) {
        console.log('Error ');
      }
    } else alert('Campos incorectos');
  }

  private preveUpdateWhenNameExists(customerNewData: Customer) {
    Swal.fire({
      title: '¿Actualizar Datos?',
      html: `<p><span style ="color: yellow">Advertencia</span>: El nombre  <b>${customerNewData.name}</b> ya esta registrado en el sistema<p>`,
      // text: ``,
      icon: 'question',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Actualizar de todos modos',
      cancelButtonText: 'Cancelar y cambiar nombre',
    }).then((resp) => {
      if (resp.value) this.updateData(customerNewData);
    });
  }
  fnCancel() {
    33;
    this.refresfData();
  }
  private async validNameIsExist(): Promise<boolean> {
    const nameCurrent = this.formData.value['name'];
    return await firstValueFrom(
      this.customerService.verifyIsExistCustomer(
        nameCurrent,
        'NAME',
        this.idCustomer
      )
    );
  }

  private updateData(customerData: Customer) {
    this.customerService
      .update(this.idCustomer, customerData)
      .pipe(
        tap((resp) => {
          this.customerCurrent = resp as Customer;
          this.toaster.success('Información se actualizo correctamente');
          this.refresfData();
        
        }),
        catchError((err) => {
          this.toaster.error('Error al actualizar la información');
          console.log(err);
          return of(null);
        })

      ).subscribe();
  }
  private refresfData() {
    this.customerEvent.next(this.customerCurrent);
    this.formData.patchValue(this.customerCurrent);
  }

  private setNullEmptyValues() {
    const values = this.formData.getRawValue();

    for (const key in values) {
      if (!this.formData.value[key]) {
        this.formData.controls[key].reset();
      }
    }
  }
}
