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
import { InscriptionFetch, InscriptionModel } from 'src/app/core/models/inscription-model';
import { dniOrEmailValidator, validDateBegin } from '../../util/validator';
import { calImc } from 'src/app/utils/calc-imc';
import {
  validaDateBorn,
  validatorDni,
} from 'src/app/utils/validators/person.validator';

import { catchError, firstValueFrom, of, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { TypeOperationFormInsCustomer } from 'src/app/utils/utilForm';
import { TransactionSrService } from 'src/app/services/transaction-sr.service';
import { UtilFiltersService } from 'src/app/shared/services/util-filters.service';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from 'src/app/modules/report/services/report.service';
import { ReportParams } from 'src/app/core/models/page-render.model';

// const DEFAULT_ID_MODALITY = 1;

@Component({
  selector: 'app-form-customers',
  templateUrl: './form-customers.component.html',
  styleUrls: ['./form-customers.component.scss'],
})
export class FormCustomersComponent implements OnInit, AfterViewInit {
  // new customer | add membresia | edit membresia  
  // @Input('ideCustomer') ideCustomer: number;


  // Se inyecta desde el componente del cliente|  editar cliente | lista inscripcines
  @Input() operationForm: TypeOperationFormInsCustomer;

  formData: FormGroup;
  validMessage = messagesErrorCustomer;
  typeInscriptions = TypeInscriptions;

  private customerFull: CustomerFull;

  // Agregar un objeto por defecto
  listModalities: Modality[] = [
    // { ide: DEFAULT_ID_MODALITY, name: 'Otras', price: 0 },
  ];

  @ViewChild('childName') inputName: ElementRef;
  @ViewChild('childPay') inputPay: ElementRef;

  constructor(
    public modal: NgbActiveModal,
    private modalityService: ModalityService,
    private utilCustomerService: UtilCustomerService,
    private toaster: ToastrService,
    private customerService: CustomerService,
    private utilFiltersService: UtilFiltersService,
    private transactionService: TransactionSrService,
    private reportService: ReportService,
  ) { }

  ngAfterViewInit(): void {
    /**
     *  los elementos vinculados a @ViewChild, van a estar disponibles luego de que se dispare ngAfterViewInit.
     */

    // this.renderer.selectRootElement(this.inputName).focus();
    // this.inputName.nativeElement.focus(); //  editar
  }

  ngOnInit(): void {
    // console.log('customer nueva membresi: ' + this.ideCustomer);
    this.createForm();
    this.getModalities();
    this.changePropertiesInicializer();
    this.onChangeListeners();
    this.selectDataInicializer();
    this.canWriteField();
    console.log(this.operationForm)
  }


  private selectDataInicializer() {

    // add inscription or update inscription
    if (this.operationForm.type != "newCliente") {
      if (this.operationForm.type == "newInscription")
        this.putDataNewInscription();
      else this.putDataUpdateInscription();

    }


  }


  /**
   * Obtiene la inscripcion selecciona para editarla 
   */
  private putDataUpdateInscription() {

    this.customerService.findByIdeInscriptionFetch(this.operationForm.ideInscription as number)
      .subscribe(resp => {
        // console.log(resp)


        const fullInscription = resp as InscriptionFetch;

        console.log(fullInscription)

        // clientes
        this.formData.controls['name'].setValue(fullInscription.customer.name)


        // Evolution
        this.formData.get('evolution.weight')?.setValue(fullInscription.evolutionCtm?.weight);
        this.formData.get('evolution.height')?.setValue(fullInscription.evolutionCtm?.height);
        this.formData.get('evolution.imc')?.setValue(fullInscription.evolutionCtm?.imc);
        this.formData.get('evolution.resultImc')?.setValue(fullInscription.evolutionCtm?.resultImc);
        this.formData.get('evolution.typeWeight')?.setValue(fullInscription.evolutionCtm?.typeWeight);
        this.formData.get('evolution.description')?.setValue(fullInscription.evolutionCtm?.description);

        // Modality

        // Este cargar antes de asignar price, ya que modality tiene un evento change para poner su valor de modalidads
        this.formData.controls['modality'].setValue(fullInscription.modality?.ide);

        // Transaction
        this.formData.get('typePay')?.setValue(fullInscription.transaction?.typePay);
        this.formData.controls['price'].setValue(fullInscription.transaction?.price);
        this.formData.get('pay')?.setValue(fullInscription.transaction?.pay);
        this.formData.get('balance')?.setValue(fullInscription.transaction?.balance);
        this.formData.get('total')?.setValue(fullInscription.transaction?.total);


        // Inscription
        this.formData.get('numberMonth')?.setValue(fullInscription?.numberMonth);
        this.formData.get('dateBegin')?.setValue(fullInscription?.dateBegin);
        this.formData.get('dateFinalize')?.setValue(fullInscription?.dateFinalize);
        this.formData.get('workDay')?.setValue(fullInscription?.workDay);
        this.formData.get('typeInscription')?.setValue(fullInscription?.typeInscription);
        this.formData.get('descriptionInscription')?.setValue(fullInscription?.description);


        console.log(this.formData.controls)
        console.log(this.formData.valid)

      })


  }

  /**
   * Obtener la ultima inscripcion del cliente y ubicar los datos en el formulario 
   */
  private putDataNewInscription() {

    this.customerService.findByIdeFetch(this.operationForm.ideCustomer as number).subscribe(resp => {

      // If el cliente no tiene una ultima inscripcionm solo devolvera la informacion del cliente
      // así que hay tener cuidado con los null, x ello utilizo el signo ?

      this.formData.controls['name'].setValue(resp.customer.name)
      this.formData.get('evolution.weight')?.setValue(resp.evolutionCtm?.weight);
      this.formData.get('evolution.height')?.setValue(resp.evolutionCtm?.height);

      // Este cargar antes de asignar price, ya que modality tiene un evento change para poner su valor de modalidads
      this.formData.controls['modality'].setValue(resp.modality?.ide);

      // Asigno el precio correspondiente a la ultima incripcion
      this.formData.controls['price'].setValue(resp.transaction?.price);

      this.inputPay.nativeElement.focus(); //  editar

      // console.log(resp)
    })

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
        ], [validDateBegin(this.customerService, this.operationForm)]),
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

        // un valor a lazar el 1
        modality: new FormControl(1),

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
        evolution: new FormGroup({

          weight: new FormControl(null, [Validators.min(1)]),
          height: new FormControl(null, [Validators.min(1)]),
          imc: new FormControl(null, [Validators.min(0)]),
          resultImc: new FormControl(null),

          typeWeight: new FormControl('KG', [Validators.required]),
          description: new FormControl(null, [
            // Validators.required,
          ]),
        })


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

        // Debe cargar esa funcions para poderla utilizar
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

    // if (g.get('description').value == '') g.get('description').reset();

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

      // if (modalityFound?.ide != DEFAULT_ID_MODALITY) {
      // }
      this.formData.get('price')?.setValue(modalityFound?.price);
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

    this.formData.get('name')?.valueChanges.subscribe((data) => {


      this.formData.patchValue({ name: data.toUpperCase() as string }, {  
        emitEvent: false,
        });
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

    // console.log('balance ' + balance);
    this.formData.controls['balance']?.setValue(balance);
  }


  // This method is called then load the modalities 
  private setValueDefault() {

    // console.log(this.listModalities.length)
    if (this.listModalities.length >= 1) {

      // Ubicar la opcion x default en select modality- se eliggue a la de menor precio
      let modalityLess = this.listModalities.sort((a, b) => a.price - b.price)[0];

      this.formData.get('modality')?.setValue(modalityLess.ide);
      this.formData.get('price')?.setValue(modalityLess.price);
    }
  }

  fnSubmit() {

    if (this.formData.valid) {

      this.customerFull = new CustomerFull();

      this.customerFull.customer = this.createCustomer();
      this.customerFull.inscription = this.createInscription();

      console.log(this.customerFull);

      // Cliente existente - nueva membresia 
      if (this.operationForm.type == "newInscription")
        this.saveNewInscription();

      else if (this.operationForm.type == "newCliente")
        this.saveNewCustomer();

      else this.saveUpdateInscription();

    } else alert('Campos incorrectos');

  }

  private async saveNewCustomer() {

    let isNameExist = false;

    // Verificar si el nombre ya esta registrado en la bd, solo si no ha ingresado una cedula
    if (!this.customerFull.customer.dni) {
      const obs = this.customerService.verifyIsExistCustomer(
        this.customerFull.customer.name,
        'NAME'
      );
      isNameExist = await firstValueFrom(obs, { defaultValue: false });
    }

    // El nombre no existe en la bd o el cliente tiene cedula se guarda directamente
    if (!isNameExist) {


      this.executeSaveNewCustomer();

      // this.customerService.save(this.customerFull).pipe(
      //   tap((data) => {
      //     console.log(data);
      //     this.modal.dismiss();
      //     this.toaster.success('Cliente guardado correctamente');
      //     // Emitir evento para actualizar la tabla de clientes
      //     // this.utilFiltersService.eventFiltersEmit(null);
      //   }),
      //   catchError((error) => {
      //     console.log(error);
      //     this.toaster.error('Surgio un error al guardar cliente');
      //     return of(null);
      //   })
      // ).subscribe();


      // this.customerService.save(this.customerFull).subscribe(data => {
      //   console.log(data);
      //   this.modal.dismiss()
      // }, error => {

      //   console.log(error)


      // });



    } else {


      // el nombre ya existe en la bd, se pregunta si desea guardar de todos modos
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

          this.executeSaveNewCustomer();

        }
      });
    }

  }
  private executeSaveNewCustomer() {

    this.customerService.save(this.customerFull).pipe(
      tap((data) => {
        console.log(data);
        this.modal.dismiss();
        this.toaster.success('Cliente guardado correctamente');
        // Emitir evento para actualizar la tabla de clientes
        this.utilFiltersService.eventFiltersEmit(null);
      }),
      catchError((error) => {
        console.log(error);
        this.toaster.error('Surgio un error al guardar cliente');
        return of(null);
      })
    ).subscribe();

  }

  private saveNewInscription() {

    this.customerService.saveNewInscription(this.operationForm.ideCustomer as number, this.customerFull).subscribe(resp => {
      console.log("Nueva incripcion fue guardada")
      console.log(resp)
    });

    return;
  }

  private saveUpdateInscription() {

    // Aqui no deseo la informacion del clientes, solo de la inscripcion

    this.transactionService.updateInscription(this.operationForm.ideInscription as number,
      this.customerFull.inscription).pipe(
        tap(resp => {
          console.log(resp)

          this.modal.dismiss();
          this.toaster.success("Membresía actualizada con exito");

          // Actualizar la tabla de inscripciones
          this.utilFiltersService.eventFiltersEmit(null);

        }),
        catchError(err => {
          console.log(err)
          this.toaster.error("Error al actualizar la membresía");

          return of(null)
        })
      ).subscribe();



    this.transactionService.updateInscription(this.operationForm.ideInscription as number,
      this.customerFull.inscription).subscribe(resp => {

        console.log(resp)
        console.log("registro actualizado")

      })
  }

  private getCurrentDate(numberMonthMore: number): string {
    let dateCurrent = dayjs().add(numberMonthMore, 'month');

    return dateCurrent.format('YYYY-MM-DD');
  }

  get listTypePay(): TypePayEnum[] {
    return this.utilCustomerService.getListTypePayEnum;
  }

  private createInscription(): InscriptionModel {
    const inscription: InscriptionModel = {
      ide: null,
      dateBegin: this.formData.value['dateBegin'],
      // dateFinalize esta deshabilitado, por lo tanto para acceder al valor
      // debe acceder al control primeroy de hay al value, de lo contrario
      // si accede directamente al value, dará undefined
      dateFinalize: this.formData.controls['dateFinalize'].value,
      workDay: this.formData.value['workDay'],
      numberMonth: this.formData.value['numberMonth'],
      typeInscription: this.formData.value['typeInscription'],
      description: this.formData.value['descriptionInscription'],
      modality: this.formData.value['modality'],
      transaction: this.createTransaction()
    };


    let evolution = this.createEvolution();
    if (evolution) inscription.evolution = evolution;
    return inscription;
  }

  private createCustomer(): Customer {
    const customer = new Customer();

    // El campo name en ocasiones esta disabled, por elde por seguridad para tener acceso al valor 
    // utilizo get en ves de acceder director al valor(no se puede)
    customer.name = (this.formData.get('name')?.value as string).toUpperCase();

    customer.email = this.formData.value['email'];
    customer.address = this.formData.value['address'];
    customer.dni = this.formData.value['dni'];
    customer.phone = this.formData.value['phone'];
    customer.born = this.formData.value['born'];
    customer.status = true;
    customer.genero = this.formData.value['genero'];

    return customer;
  }
  private createEvolution(): Evolution | null {

    const evolution = this.formData.get('evolution')?.value as Evolution;

    if (evolution.height && evolution.height) {

      const { imc, resultImc } = calImc(evolution.weight, evolution.height);

      evolution.imc = imc;
      evolution.resultImc = resultImc;
      return evolution;

    } return null;

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

  public getTitleForm(): string {

    if (this.operationForm.type == "newInscription") return "Nueva Membresía";
    if (this.operationForm.type == "updateInscription" && this.operationForm.write) return "Actualizar Membresía";
    if (this.operationForm.type == "updateInscription" && !this.operationForm.write) return "Membresía Finalizada (no editable)";
    return "Nuevo Cliente";

  }

  public showPanelInfoPerson(): boolean {
    return this.operationForm.type == "newCliente";
  }

  private canWriteField() {

    if (!this.operationForm.write) {
      this.formData.disable();
    }

    // Cuando sea editar la membresia no se podrá cambiar el nombre de cliente
    if (this.operationForm.type == "updateInscription") {
      this.formData.get('name')?.disable();
    }
  }

  generateReport() {

    const params: ReportParams = {
      typeReport: "INSCRIPTION_BY_CUSTOMER",
      typeAction: "REPORT",
      customer: `${this.operationForm.ideInscription}`, // este dato en el backend representa el ide de la inscripcion que se desea generar el repporte, to
      // todos los reportes se generan en la aplicacion web, apuntan a un unico endpoint, y este se encarga de generar el reporte
      typeUser: "", // esttos no se usan
      modality: "" // esttos no se usan
    }



    this.reportService.generateReportInscriptions(params, "blob").pipe(
      tap((resp: any) => {
        console.log("resp", resp);
        const blob = new Blob([resp], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      }),
      catchError((err) => {
        console.log("err", err);

        alert("Error al generar el reporte");
        return of(null);
        // return throwError(err);
      }


      )).subscribe();

    // alert("generar Reporte")
  }


  showBtnReport(): boolean {

    return this.operationForm.type == "updateInscription";
  }

}
