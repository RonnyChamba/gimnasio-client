import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, catchError, of, tap } from 'rxjs';
import { InscriptionListPage } from 'src/app/core/models/inscription-model';
import { PageRender, PaginatorAttendanceAndMembresias } from 'src/app/core/models/page-render.model';
import { FormCustomersComponent } from 'src/app/modules/customer/components/form-customers/form-customers.component';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { TypeOperationFormInsCustomer } from 'src/app/utils/utilForm';
import { UtilFiltersService } from 'src/app/shared/services/util-filters.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { TransactionSrService } from 'src/app/services/transaction-sr.service';
import { TokenService } from 'src/app/modules/auth/service/token.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-list-inscription',
  templateUrl: './list-inscription.component.html',
  styleUrls: ['./list-inscription.component.scss']
})
export class ListInscriptionComponent implements OnInit, OnDestroy {


  // Cuando el ide es 0 signfica que tiene que listar todas las inscripciones registradas en la base de datos
  // Cuando no es 0, equivale al id del cliente, y se listan las inscripciones del cliente en particular 
  @Input() idCustomer: number = 0;
  
  // Esta variable permite mostrar u ocultar el nombre del cliente en la tabla de membresías
  @Input() reduceColumns: boolean = false;


  listData: InscriptionListPage[];
  pageRender: PageRender;
  sumaTotalElements = 0;
  paramPaginator: PaginatorAttendanceAndMembresias = { page: 0, size: 5, typeUser: "", typeData: "INSCRIPTION" };

  showDetails = false;
  showDetailsModality = false;
  showDetailsDateBegin = false;
  
  private subscription: Subscription = new Subscription();

  isAdmin = false;

  constructor(
    private customerService: CustomerService,
    private utilFiltersService: UtilFiltersService,
    private toaster: ToastrService,
    private  transactionSrv: TransactionSrService,
    private tokenService: TokenService,
    private modalService: NgbModal,
    private messageService: MessageService
    ) {
      this.isAdmin = this.tokenService.isAdmin();
     }

  ngOnInit(): void {
    
    this.findAll();
    this.addSubscription();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private addSubscription() {
  

    this.subscription.add(
      this.utilFiltersService.eventFiltersObservable().subscribe(resp => {
        console.log("Respuesta del filtro", resp)

        // asignar los valores de los filtros al servicio de utilidades, este  es el caso que se desea generar un reporte
        this.utilFiltersService.params = this.paramPaginator;

      /**
       * 
       * Procesos cuando se ejecuta el observable
       * 
       * 1) Se ejecuta cuando los filtro o parametros de busqueda cambian en el componente de busqueda con 
       * el fin de listar los datos segun los filtros que se envien, en este caso reciben  como argumento los filtros 
       * que fueron seleccionados, 
       * 
       * 2) Cuando se elimina o edita un registro de la tabla  para actualizar toda la tabla, en este caso se envia como argumento
       * un valor null para que se ejecute el metodo de listar todos los registros.
       * 
       * 3) Cuando se desea generar un reporte desde el component CustomerEditComponent, en este caso se envia como parametro un string 
       * con el valor "REPORT", en este caso, lo que se debe hacer es simplemente asignar los valores de los filtros que
       *  se encuentran en el componente de busqueda, para que se genere el reporte con los filtros que se encuentran en el componente
       * de busqueda. Ademas, no debe actualizar la tabla, por lo tanto no debe ejecutar el metodo de listar todos los registros.
       * 
       */

      // Verificar si se desea generar un reporte o actualizar la tabla
      if (resp && resp == "REPORT") {
        // indica que se desea generar un reporte, por lo tanto no debe actualizar la tabla ni filtrar
        console.log("dento del report",);
        return;
  
      }

        
        // Filtro de busqueda
        if (resp) {
          this.paramPaginator = resp as PaginatorAttendanceAndMembresias;
          // Cuando cambia algun filtro, siempre que empieza por la pgina 0
          this.paramPaginator.page = 0;
        } // actaulizada la tabla despues de eliminar o editar la inscripcion

    
        this.findAll();

      })
    );


  }


  private findAll() {


    this.messageService.loading(true);
    // Importante asignar este tipo que sea iguak¿l a uno de los tipos que se encuentran en el enum TypeReport
    this.paramPaginator.typeData = "INSCRIPTION";


    setTimeout(() => {

      this.customerService.findAllMembresiasByCustomer(this.idCustomer, this.paramPaginator).subscribe(resp => {

        console.log(resp)
        this.listData = resp.data;
        this.pageRender = resp.page;
        this.calculSumaRegister();
        this.messageService.loading(false);
      })

    }, 200);

    
    // }
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

  changePage(numberPage: number) {

    // console.log("Number  of  page" +  numberPage)
    this.paramPaginator.page = numberPage || numberPage == 0 ? numberPage : this.paramPaginator.page;
    this.findAll();
  }

  delete(ide: number) {

    Swal.fire({
      title: '¿Eliminar Membresía?',
      // html: ``,
      text: `Se eliminarán todos los datos relacionados con la membresía.`,
      icon: 'question',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {


        this.transactionSrv.deleteInscription(ide).pipe(

          tap(resp => {
            console.log(resp)
            this.toaster.info("Membresía eliminada correctamente")
            this.findAll();
          }),
          catchError(err => {
            console.log(err)
            this.toaster.error("Ocurrio un error al eliminar", "Error")
            return of(null);
          })
        ).subscribe();
      
      }

    });


    // alert("eliminar inscription")

  
 
  }


  edit(ide: number, write: boolean, ideCustomer: any) {

    console.log(ide, write)


    const references = this.modalService.open(FormCustomersComponent, {
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });

    const param: TypeOperationFormInsCustomer = {
      type: 'updateInscription',

      // Enviar el ide de la inscripcion a editar
      ideInscription: ide,
      // pasamos el ide del cliente para luego el form para editar la insscription, validar la fecha de inicio
      // Aqui es necesario pasarmelo, pero cuando estamos en editar customer, no es necesario pasarlo, ya que tomo el ide 
      // del customer que esta en el form
      ideCustomer: ideCustomer,
      write,
    }


    references.componentInstance.operationForm = param;
  }

  // generateReport(ide: number) {

  //   alert("generar reporte")
  // }
}
