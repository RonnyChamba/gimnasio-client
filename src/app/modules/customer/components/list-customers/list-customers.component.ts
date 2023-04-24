import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, catchError, of, tap } from 'rxjs';
import { CustomerList } from 'src/app/core/models/customer-model';
import {
  PageRender, PaginatorCustomer
} from 'src/app/core/models/page-render.model';
import { TypeOperationFormInsCustomer } from 'src/app/utils/utilForm';
import Swal from 'sweetalert2';
import { CustomerService } from '../../services/customer.service';
import { UtilCustomerService } from '../../services/util-customer.service';
import { FormCustomersComponent } from '../form-customers/form-customers.component';
import { MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { UtilFiltersService } from 'src/app/shared/services/util-filters.service';
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


  // here add suscriptiones
  private subscription: Subscription = new Subscription();

  constructor(
    private modalService: NgbModal,
    private customerService: CustomerService,
    private utilFiltersService: UtilFiltersService,
    private utilCustomerService: UtilCustomerService,
    private toaster: ToastrService
  ) { 

  
  }

  ngOnInit(): void {
    // console.log('size default' + this.size);
    this.findAll();
    this.addSubscription();
  }

  private addSubscription() {

    // Add una subcription, se execute by update table
    
    // this.subscription.add(

    //   this.customerService.getRefreshUpdateTableObservable().subscribe(resp => {

    //     this.findAll();
    //   })
    // )
    //     this.subscription.add(
    //   this.utilCustomerService.filterTableAsObservable().subscribe(filtePro => {

    //     this.paramPaginator.size = filtePro.size;
    //     this.paramPaginator.valueSearch = filtePro.valueSearch;
    //     this.paramPaginator.dateBegin = filtePro.dateBegin;
    //     this.paramPaginator.dateEnd = filtePro.dateEnd;
    //     this.paramPaginator.page=0;

    //     this.changePage();

        
        

    //     // console.log(filtePro)
    //   })
    // )

    this.subscription.add(
      
      this.utilFiltersService.eventFiltersObservable().subscribe(resp => {
            
        console.log("eventFiltersObservable in list-customers")

        // List by filter
        if (resp) {

          console.log(resp);
          this.paramPaginator = resp as PaginatorCustomer;
          this.paramPaginator.page=0;
          this.changePage();

          // list all by new inscriptions or delete customer
        }else this.findAll ();
      
      })
    
      )


  }

  ngOnDestroy(): void {
    // UnSubcribe, this is necesary becaouse the subcripciones se repiten
    this.subscription.unsubscribe();
  }

  findAll() {
    this.customerService.findAll(this.paramPaginator).subscribe((resp) => {
      this.listData = resp.data;
      this.pageRender = resp.page;


      // console.log(resp);
      // console.log(this.listData);
      this.calculSumaRegister();
    });
  }
  edit(ide: number) {
    // console.log('Abrir modal customer');

    const references = this.modalService.open(FormCustomersComponent, {
      size: 'lg',
    });



    const param: TypeOperationFormInsCustomer = {
      type: 'newInscription',
      // paso el ide del cliente para obtener su  utlima inscripcion 
      ideCustomer: ide,
      write: true
    }

    references.componentInstance.operationForm = param;
  }

  delete(ide: number) {

    console.log("gistro a eliminar: " + ide)

    Swal.fire({
      title: '¿Seguro eliminar cliente?',
      text: "Se eliminará todos los registros asociados del cliente a eliminar",
      // text: ``,
      icon: 'question',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',

      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {


        this.customerService.delete(ide).pipe(
          tap(resp => {

            console.log(resp)
            this.toaster.success("Cliente eliminado correctamente");
            this.findAll();

          }),
          catchError(err => {

            console.log(err)
            this.toaster.error("Error al eliminar cliente")
            return of(null)
          })
        ).subscribe()


        this.customerService.delete(ide).subscribe(resp => {

          console.log(resp)
        })
      }
    });

  }

  changePage(numberPage?: number) {

    // console.log("Number  of  page" +  numberPage)
    this.paramPaginator.page = numberPage || numberPage == 0 ? numberPage : this.paramPaginator.page;


    /**
     * If there is a text input, begggin page 0
     * 
     * If sizePage is mayor que el total de elemntos, entonces que muestre los resultado en la pagina 0 
     */

    if (this.paramPaginator.valueSearch || (this.paramPaginator.size >= this.pageRender.totalElements)) this.paramPaginator.page = 0;

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

    this.customerService.saveAttendance(ide)
    .pipe(
      tap(resp => {
        console.log(resp)
        this.toaster.success('Registro de asistencia exitoso', 'Asistencia')
      }),
      catchError(err => {
        console.log(err)
        this.toaster.error('Error al registrar asistencia', 'Asistencia')
        return of(null);
      })
    ).subscribe();
  
  }

}
