import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TypePayEnum } from 'src/app/core/enum/pay-enum';
import { Modality } from 'src/app/core/models/modality-model';
import { ModalityService } from 'src/app/modules/admin/services/modality.service';
import {
  MIN_NAME,
  MAX_NAME,
  MIN_CEDULA,
  MIN_EMAIL,
  MAX_EMAIL,
  MAX_ADDRESS,
  MAX_TELEPHONE,
} from 'src/app/utils/Constants-Field';
import { UtilCustomerService } from '../../services/util-customer.service';
import { messagesErrorCustomer } from '../../util/MessageValidationCustomer';

import * as dayjs from 'dayjs';

import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { TypeInscriptions } from '../../util/util-enum';
import { CustomerService } from '../../services/customer.service';
import { CustomerFull } from 'src/app/core/models/customer-full';
import { Customer } from 'src/app/core/models/customer-model';
import { Evolution } from 'src/app/core/models/evolution-model';
import { Transaction } from 'src/app/core/models/transaction-model';
import { Inscription } from 'src/app/core/models/inscription-model';
import { dniOrEmailValidator } from '../../util/validator';
import { calImc } from 'src/app/utils/calc-imc';
import {
  validaDateBorn,
  validatorDni,
} from 'src/app/utils/validators/person.validator';

import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

const DEFAULT_ID_MODALITY = -1;

@Component({
  selector: 'app-form-customers',
  templateUrl: './form-customers.component.html',
  styleUrls: ['./form-customers.component.scss'],
})
export class FormCustomersComponent implements OnInit, AfterViewInit {
  // is new or update customer
  @Input('ideCustomer') ideCustomer: number;

  formData: FormGroup;
  validMessage = messagesErrorCustomer;
  typeInscriptions = TypeInscriptions;

  private customerFull: CustomerFull;

  // Agregar un objeto por defecto
  listModalities: Modality[] = [
    { ide: DEFAULT_ID_MODALITY, name: 'Otras', price: 0 },
  ];

  @ViewChild('childName') inputName: ElementRef;

  constructor(
    public modal: NgbActiveModal,
    private modalityService: ModalityService,
    private utilCustomerService: UtilCustomerService,
    private customerService: CustomerService
  ) {}

  ngAfterViewInit(): void {
    /**
     *  los elementos vinculados a @ViewChild, van a estar disponibles luego de que se dispare ngAfterViewInit.
     */

    // this.renderer.selectRootElement(this.inputName).focus();
    this.inputName.nativeElement.focus(); //  editar
  }

  ngOnInit(): void {
    console.log('customer ide: ' + this.ideCustomer);
    this.createForm();
    this.getModalities();
    
    this.changePropertiesInicializer();
    this.onChangeListeners();  
  }


  private createForm() {
    this.formData = new FormGroup(
      {
        dni: new FormControl(
          null,
          [Validators.pattern(`^[0-9]{${MIN_CEDULA}}$`), validatorDni()],
          [dniOrEmailValidator(this.customerService, 'DNI')]
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
          [dniOrEmailValidator(this.customerService, 'EMAIL')]
        ),

        genero: new FormControl('N', []),

        address: new FormControl(null, [Validators.maxLength(MAX_ADDRESS)]),

        born: new FormControl(null, [
          Validators.pattern('^[0-9]{4}(-|/)[0-9]{2}(-|/)[0-9]{2}$'),
          validaDateBorn(),
        ]),

        // DATOS DE LA INSCRIPCION
        dateBegin: new FormControl(this.getCurrentDate(0), [
          Validators.required,
          Validators.pattern('^[0-9]{4}(-|/)[0-9]{2}(-|/)[0-9]{2}$'),
        ]),
        dateFinalize: new FormControl(this.getCurrentDate(1), [
          Validators.required,
          Validators.pattern('^[0-9]{4}(-|/)[0-9]{2}(-|/)[0-9]{2}$'),
          this.validatorDateFinalize(),
        ]),
        workDay: new FormControl(null, [
          //  Validators.required
        ]),

        // Registro mes o por dia
        typeInscription: new FormControl(TypeInscriptions.MONTH, [
          Validators.required,
        ]),

        numberMonth: new FormControl(1, [
          Validators.required,
          Validators.pattern('^[0-9]{1,2}$'),
        ]),

        modality: new FormControl(DEFAULT_ID_MODALITY),

        descriptionInscription: new FormControl(null, []),
        // DATOS DE LA TRANSACCION
        typePay: new FormControl(TypePayEnum.EFECTIVO, [Validators.required]),
        price: new FormControl(0, [Validators.required, Validators.min(0)]),
        pay: new FormControl(0, [
          Validators.required,
          Validators.min(0),
          this.validatorPay(),
        ]),
        balance: new FormControl(0, [Validators.required, Validators.min(0)]),
        total: new FormControl(0, [Validators.required, Validators.min(0)]),

        // DATOS DE LA EVOLUCION DEL CLIENTE
        weight: new FormControl(null, [Validators.min(1)]),
        height: new FormControl(null, [Validators.min(1)]),
        imc: new FormControl(null, [Validators.min(0)]),
        resultImc: new FormControl(null),

        typeWeight: new FormControl('KG', [Validators.required]),
        description: new FormControl(null, [
          // Validators.required,
        ]),
      },
      this.validarFormGeneral
    );
  }

  /**
   * Valida que el pago no sea mayor al total de la transaccion
   * @returns
   */
  private validatorPay(): ValidatorFn {
    return (pay: AbstractControl): ValidationErrors | null => {
      if (pay.dirty) {
        let total = this.formData.value['total'];

        if (total == null) {
          return null;
        }
        if (!pay.value) {
          return null;
        }

        if (pay.value > total) {
          return { errorPay: 'Pago no puede ser superior al total' };
        }

        return null;
      }
      return null;
    };
  }

  private validatorDateFinalize(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Getting date finalize
      let valueDateFinalize = control.value;

      // Valid date and format
      if (dayjs(valueDateFinalize, 'YYY-MM-DD').isValid()) {
        // console.log(`Fecha inicio es valida:`);

        // Create a daysJs Object
        let dateFinalizeJs = dayjs(valueDateFinalize);
        dayjs.extend(isSameOrAfter);

        // Getting date begin
        if (this.formData?.value.dateBegin) {
          let valueDateBegin = this.formData?.value.dateBegin;

          // Create a daysJs Object
          let dateBeginJs = dayjs(valueDateBegin);

          return dateFinalizeJs.isSameOrAfter(dateBeginJs, 'day')
            ? null
            : { validRonny: 'Fecha finalización es incorrecta' };
        }
      }
      return null;
    };
  }

  validarFormGeneral(g: any) {
    if (g.get('email').value == '') g.get('email').reset();
    if (g.get('address').value == '') g.get('address').reset();
    if (g.get('phone').value == '') g.get('phone').reset();
    if (g.get('born').value == '') g.get('born').reset();
    if (g.get('dni').value == '') g.get('dni').reset();
    if (g.get('numberMonth').value == '-1') g.get('numberMonth').reset(1);
    if (g.get('descriptionInscription').value == '')
      g.get('descriptionInscription').reset();

    if (g.get('price').value == '-1') g.get('price').reset();
    if (g.get('pay').value == '-1') g.get('pay').reset();
    // if (g.get('balance').value == '-1') g.get('balance').reset();

    if (g.get('description').value == '') g.get('description').reset();

    return null;
  }
  private getModalities() {
    this.modalityService.getModalities().subscribe((response) => {
      this.listModalities.push(...response.data);
      this.setValueDefault();
    });
  }

  private onChangeListeners() {
    this.formData.get('dateBegin')?.valueChanges.subscribe((data) => {
      let numberMonthOrDays = this.formData.value['numberMonth'];
      let typeInscription = this.formData.value['typeInscription'];

      this.incrementDateFinalize(numberMonthOrDays, typeInscription);
    });

    this.formData.controls['modality'].valueChanges.subscribe((data) => {
      let modalityFound = this.listModalities.find((item) => item.ide == data);

      if (modalityFound?.ide != DEFAULT_ID_MODALITY) {
        this.formData.get('price')?.setValue(modalityFound?.price);
      }
    });

    this.formData.controls['numberMonth'].valueChanges.subscribe(
      (numberMonthOrDays) => {
        // Getting register type: month or Day
        let typeInscription = this.formData.value['typeInscription'];
        this.incrementDateFinalize(numberMonthOrDays, typeInscription);

        this.calcTotal(this.formData.value['price'], numberMonthOrDays);
      }
    );

    this.formData.controls['typeInscription'].valueChanges.subscribe(
      (typeInscription) => {
        let numberMonthOrDays = this.formData.value['numberMonth'];
        this.incrementDateFinalize(numberMonthOrDays, typeInscription);
        this.calcTotal(this.formData.value['price'], numberMonthOrDays);
        this.formData.controls['pay'].updateValueAndValidity();
      }
    );

    this.formData.controls['pay'].valueChanges.subscribe((newPay) => {
      // let price = this.formData.value['price'];
      this.calcBalance(newPay);
    });

    this.formData.controls['price'].valueChanges.subscribe((newPrice) => {
      let pay = this.formData.value['pay'];
      // this.calcBalance(newPrice, pay);
      this.calcTotal(newPrice, this.formData.value['numberMonth']);
      this.formData.controls['pay'].updateValueAndValidity();
    });

    this.formData.controls['total'].valueChanges.subscribe((newTotal) => {
      this.formData.controls['pay'].updateValueAndValidity();
    });
  }

  private calcTotal(price: number, numMonthOrDays: number) {
    let total = 0;

    if (this.formData.value['typeInscription'] == TypeInscriptions.MONTH) {
      if (price && numMonthOrDays) {
        total = price * numMonthOrDays;
      }
    }

    if (this.formData.value['typeInscription'] == TypeInscriptions.DATE) {
      if (price && numMonthOrDays) total = price;
    }

    this.formData.controls['total']?.setValue(total);

    this.calcBalance(this.formData.value['pay']);
  }
  private changePropertiesInicializer() {
    // Disabled  finalize date input

    this.formData.get('dateFinalize')?.disable({
      onlySelf: true,
      // emitEvent: false,
    });
  }
  private incrementDateFinalize(
    numberMonthOrDays: number,
    typeInscription: string
  ) {
    let dateBegin = this.formData.value['dateBegin'];
    // Se permite  ubicar 0 meses
    if (numberMonthOrDays || numberMonthOrDays == 0) {
      if (dayjs(dateBegin, 'YYYY-MM-DD')) {
        // Convert to days Object
        let dateMonthJs = dayjs(dateBegin);

        // Create a new date finalize with month or day incremented
        let dateIncrement =
          typeInscription + '' == TypeInscriptions.MONTH
            ? dateMonthJs.add(numberMonthOrDays, 'month')
            : dateMonthJs.add(numberMonthOrDays, 'day');

        this.formData
          .get('dateFinalize')
          ?.setValue(dateIncrement.format('YYYY-MM-DD'));
      } else console.log(`Fecha inicio es incorrecta :${dateBegin}`);
    } else
      console.log(`Numero de meses o dias incorrecto:${numberMonthOrDays}`);
  }

  private calcBalance(pay: number) {
    let total = this.formData.value['total'];
    let balance = pay ? this.formData.value['total'] - pay : total;

    console.log('balance ' + balance);
    this.formData.controls['balance']?.setValue(balance);
  }

  /**
   * This method is called
 then load the modalities
    */
  private setValueDefault() {
    if (this.listModalities.length > 1) {
      let modalityLess = null;

      // Indica que solo hay un registro aparte del registro default
      if (this.listModalities.length == 2) {
        modalityLess = this.listModalities[1];
      } else {
        // Ordenar el arreglo ascendentemente  tomando el precio como referencia
        // una vez ordenado, tomar el primer valor(sin contar el valor por default)
        modalityLess = this.listModalities.sort((a, b) => a.price - b.price)[1];
      }

      this.formData.get('modality')?.setValue(modalityLess.ide);
      this.formData.get('price')?.setValue(modalityLess.price);
    }
  }

  removeOrAddAsynValidators() {
    const dni = this.formData.value['dni'];
    const email = this.formData.value['email'];

    if (!dni) {
      this.formData.controls['dni'].clearAsyncValidators();
      this.formData.controls['dni'].updateValueAndValidity();
    }

    if (!email) {
      this.formData.controls['email'].clearAsyncValidators();
      this.formData.controls['email'].updateValueAndValidity();
    }
  }

  async fnSubmit() {
    this.removeOrAddAsynValidators();

    // Verificar si el formulario es valido

    if (this.formData.valid) {
      this.customerFull = new CustomerFull();

      this.customerFull.customer = this.createCustomer();
      this.customerFull.inscription = this.createInscription();
      this.validCustomerFull();

      console.log(this.customerFull);
      console.log(this.formData)

      // Cliente existente - nueva membresia
      if (this.ideCustomer) {
        return;
      }

      // Save new customer

      // Verificar si el nombre ya esta registrado en la bd, solo si no ha ingresado una cedula

      let isNameExist = false;

      if (!this.customerFull.customer.dni) {
        const obs = this.customerService.verifyIsExistCustomer(
          this.customerFull.customer.name,
          'NAME'
        );
        isNameExist = await firstValueFrom(obs, { defaultValue: false });
      }

      if (!isNameExist) {
        
        this.customerService.save(this.customerFull).subscribe(data => {
          console.log(data);
          this.modal.dismiss()
        }, error =>{
          console.log(error)
        

        });


        
      } else {
        Swal.fire({
          title: '¿Guardar Nuevo Cliente?',
          html: `<p><span style ="color: yellow">Advertencia</span>: El nombre  <b>${this.customerFull.customer.name}</b> ya esta registrado en el sistema, le sugerimos que agregue el número de cédula antes de guardar <p>`,
          // text: ``,
          icon: 'question',
          allowOutsideClick: false,
          showCancelButton: true,
          confirmButtonText: 'Guardar de todos modos',

          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.value) {
            this.customerService.save(this.customerFull).subscribe((data) => {
              console.log(data);
            });
          }
        });
      }

    } else alert('Campos incorrectos');
    
  }

  private validCustomerFull() {
    if (this.customerFull.inscription.modality == DEFAULT_ID_MODALITY) {
      this.customerFull.inscription.modality = null;
    }

    // if (!this.customerFull.inscription.evolution.weight) {
    //   this.customerFull.inscription.evolution.weight = 0;
    // }
  }

  private getCurrentDate(numberMonthMore: number): string {
    let dateCurrent = dayjs().add(numberMonthMore, 'month');

    return dateCurrent.format('YYYY-MM-DD');
  }

  get listTypePay(): TypePayEnum[] {
    return this.utilCustomerService.getListTypePayEnum;
  }

  private createInscription(): Inscription {
    const inscription = new Inscription();

    inscription.dateBegin = this.formData.value['dateBegin'];

    // dateFinalize esta deshabilitado, por lo tanto para acceder al valor
    // debe acceder al control primeroy de hay al value, de lo contrario
    // si accede directamente al value, dará undefined
    inscription.dateFinalize = this.formData.controls['dateFinalize'].value;

    inscription.workDay = this.formData.value['workDay'];
    inscription.numberMonth = this.formData.value['numberMonth'];
    inscription.typeInscription = this.formData.value['typeInscription'];
    inscription.description = this.formData.value['descriptionInscription'];
    inscription.modality = this.formData.value['modality'];
    inscription.evolution = this.createEvolution();
    inscription.transaction = this.createTransaction();

    return inscription;
  }

  private createCustomer(): Customer {
    const customer = new Customer();

    customer.name = this.formData.value['name'];
    customer.email = this.formData.value['email'];
    customer.address = this.formData.value['address'];
    customer.dni = this.formData.value['dni'];
    customer.phone = this.formData.value['phone'];
    customer.born = this.formData.value['born'];
    customer.status = true;
    customer.genero = this.formData.value['genero'];

    return customer;
  }
  private createEvolution(): Evolution {
    const evolution = new Evolution();

    evolution.weight = this.formData.value['weight'];
    evolution.height = this.formData.value['height'];

    evolution.typeWeight = this.formData.value['typeWeight'];
    evolution.description = this.formData.value['description'];

    const { imc, resultImc } = calImc(evolution.weight, evolution.height);

    evolution.imc = imc;
    evolution.resultImc = resultImc;

    return evolution;
  }

  private createTransaction(): Transaction {
    const transaccion = new Transaction();

    transaccion.total = this.formData.value['total'];
    transaccion.price = this.formData.value['price'];
    transaccion.pay = this.formData.value['pay'];
    transaccion.balance = this.formData.value['balance'];
    transaccion.typePay = this.formData.value['typePay'];

    return transaccion;
  }
}
