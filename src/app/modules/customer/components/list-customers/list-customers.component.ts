import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, catchError, of, retry, tap } from 'rxjs';
import { CustomerList } from 'src/app/core/models/customer-model';
import {
  PageRender,
  PaginatorCustomer,
} from 'src/app/core/models/page-render.model';
import { TypeOperationFormInsCustomer } from 'src/app/utils/utilForm';
import Swal from 'sweetalert2';
import { CustomerService } from '../../services/customer.service';
import { FormCustomersComponent } from '../form-customers/form-customers.component';
import { ToastrService } from 'ngx-toastr';
import { UtilFiltersService } from 'src/app/shared/services/util-filters.service';
import { TokenService } from 'src/app/modules/auth/service/token.service';
import { MessageService } from 'src/app/services/message.service';
import { URL_CLIENTES } from 'src/app/utils/constants-url-path';
@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss'],
})
export class ListCustomersComponent implements OnInit, OnDestroy {
  listData: CustomerList[] = [];
  // @Input('size') size: number;
  pageRender: PageRender;

  // Asignar esto por default
  paramPaginator: PaginatorCustomer = { page: 0, size: 5 };
  sumaTotalElements = 0;

  isAdmin = false;

  // here add suscriptiones
  private subscription: Subscription = new Subscription();

  leyendaTable = "Se muestran los clientes con su última mensualidad";

  constructor(
    private modalService: NgbModal,
    private customerService: CustomerService,
    private utilFiltersService: UtilFiltersService,
    private toaster: ToastrService,
    private toeknService: TokenService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // console.log('size default' + this.size);
    this.messageService.loading(true);
    this.findAll();
    this.addSubscription();

    this.isAdmin = this.toeknService.isAdmin();
  }

  private addSubscription() {
  
    this.subscription.add(
      this.utilFiltersService.eventFiltersObservable().subscribe((resp) => {
        console.log('eventFiltersObservable in list-customers');

        // List by filter
        if (resp) {
          console.log(resp);
          this.paramPaginator = resp as PaginatorCustomer;
          this.paramPaginator.page = 0;
          this.changePage();

          // list all by new inscriptions or delete customer
        } else this.findAll();
      })
    );
    // cambio de prueba
  }

  ngOnDestroy(): void {
    // UnSubcribe, this is necesary becaouse the subcripciones se repiten
    this.subscription.unsubscribe();
  }

  findAll() {
    setTimeout(() => {
      this.customerService
        .findAll(this.paramPaginator)
        .pipe(
          tap((resp) => {
            this.listData = resp.data;
            this.pageRender = resp.page;

            // console.log(resp);
            console.log(this.listData);
            this.messageService.loading(false);
            this.calculSumaRegister();
          }),
          catchError((err) => {
            this.messageService.loading(false);
            return of(null);
          })
        )
        .subscribe();

      // this.customerService.findAll(this.paramPaginator).subscribe((resp) => {
      //   this.listData = resp.data;
      //   this.pageRender = resp.page;

      //   // console.log(resp);
      //   // console.log(this.listData);
      //   this.messageService.loading(false);
      //   this.calculSumaRegister();
      // }
      // ,
      // err => {
      //   this.messageService.loading(false);
      //   // console.log(err)
      // }
      // );
    }, 200);
  }
  edit(ide: number, dateExpired: any) {
    // console.log('Abrir modal customer');

    const references = this.modalService.open(FormCustomersComponent, {
      size: 'lg',
      // scrollable: true,
      backdrop: 'static',
      keyboard: false,
    });

    const param: TypeOperationFormInsCustomer = {
      type: 'newInscription',
      // paso el ide del cliente para obtener su  utlima inscripcion
      ideCustomer: ide,
      write: true,
      // el estado de la ultima inscripcion de cliente
      dateExpired
    };

    references.componentInstance.operationForm = param;
  }

  delete(ide: number) {
    console.log('gistro a eliminar: ' + ide);

    Swal.fire({
      title: '¿Seguro desea eliminar el cliente?',
      text: 'Se eliminará todos los registros asociados del cliente',
      // text: ``,
      icon: 'question',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',

      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) { 
        this.customerService
          .delete(ide)
          .pipe(
            tap((resp) => {
              console.log(resp);

              this.toaster.success('Cliente eliminado correctamente');

              // this.findAll();
            }),
            catchError((err) => {
              console.log(err);
              this.toaster.error('Error al eliminar cliente');
              return of(null);
            })
          )
          .subscribe();

        // this.customerService.delete(ide).subscribe((resp) => {
        //   console.log(resp);
        // });
      }
    });
  }

  changePage(numberPage?: number) {
    // console.log("Number  of  page" +  numberPage)
    this.paramPaginator.page =
      numberPage || numberPage == 0 ? numberPage : this.paramPaginator.page;

    /**
     * If there is a text input, begggin page 0
     *
     * If sizePage is mayor que el total de elemntos, entonces que muestre los resultado en la pagina 0
     */

    if (
      this.paramPaginator.valueSearch ||
      this.paramPaginator.size >= this.pageRender.totalElements
    )
      this.paramPaginator.page = 0;

    // this.messageService.loading(true);
    this.findAll();
  }

  calculSumaRegister() {
    // console.log(this.pageRender)

    this.sumaTotalElements = 0;
    if (this.pageRender.last) {
      // Sumo el total de paginas menos 1 por el numero de elementos de cada pagina
      this.sumaTotalElements =
        (this.pageRender.currentPage - 1) * this.pageRender.numElementsByPage;

      // Le sumo el total de registros de la ultim pagina, ojo, que el ultimo registro no siempre tiene
      // La misma cantidad de registros que cada pagina
      this.sumaTotalElements += this.listData.length;
    } else {
      this.sumaTotalElements =
        this.pageRender.currentPage * this.pageRender.numElementsByPage;
    }
  }

  registerAttendance(ide: number) {
    this.customerService
      .saveAttendance(ide)
      .pipe(
        tap((resp) => {
          console.log(resp);
          this.toaster.success('Registro de asistencia exitoso', 'Asistencia');
        }),
        catchError((err) => {
          console.log(err);
          this.toaster.error('Error al registrar asistencia', 'Asistencia');
          return of(null);
        })
      )
      .subscribe();
  }

  get getUrlCustomer(){
    return URL_CLIENTES;
  }
}
