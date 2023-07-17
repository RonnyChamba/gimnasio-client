import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Attendance } from 'src/app/core/models/attendance.model';
import { PageRender, PaginatorAttendanceAndMembresias } from 'src/app/core/models/page-render.model';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { TransactionSrService } from 'src/app/services/transaction-sr.service';
import * as dayjs from "dayjs";
import { Subscription, catchError, of, tap } from 'rxjs';
import { UtilFiltersService } from 'src/app/shared/services/util-filters.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/modules/auth/service/token.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-list-attendance',
  templateUrl: './list-attendance.component.html',
  styleUrls: ['./list-attendance.component.scss']
})
export class ListAttendanceComponent implements OnInit, OnDestroy {

  isAdmin = false;

  @Input() idCustomer: number = 0;

  // Determina si se debe mostrar o no ciertas columnas de la tabla
  @Input() reduceColumns: boolean = false;


  listData: Attendance[];
  pageRender: PageRender;
  sumaTotalElements = 0;
  // Importante asignar el tipo typeData desde el inicio
  paramPaginator: PaginatorAttendanceAndMembresias = { page: 0, size: 5, typeUser: "", typeData: "ATTENDANCE" };

  subscription: Subscription = new Subscription();

  // Para mostrar u ocular la fecha de salida
  showColumn: boolean = false;


  constructor(
    private customerService: CustomerService,
    private transactionService: TransactionSrService,
    private utilFiltersService: UtilFiltersService,
    private toaster: ToastrService,
    private tokenService: TokenService,
    private messageService: MessageService
  ) {
    this.isAdmin = this.tokenService.isAdmin();
  }
  ngOnInit(): void {
    this.findAll();


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

        // actualizar
        this.findAll();
      })
    )

  }

  ngOnDestroy(): void {

    this.subscription.unsubscribe();

  }
  private findAll() {

    this.messageService.loading(true);
    setTimeout(() => {

      // Importante asignar esto, sirve tanto para listar los registros como para generar el reporte
      this.paramPaginator.typeData = "ATTENDANCE";
      // el valor 0 representa que no es ningun cliente por lo tanto debe traer todos los registros de asistencia
      this.customerService.findAllMembresiasByCustomer(this.idCustomer, this.paramPaginator).subscribe(resp => {

        console.log(resp)
        this.listData = resp.data;
        this.pageRender = resp.page;
        this.calculSumaRegister();
        this.messageService.loading(false);
      })
    }, 200);



  }

  updateDateLeave(ide: any, date: string) {

    console.log(ide, date)

    if (date) {
      console.log("fecha bien")

      // convertir a ubn objeto days
      let dateParse = dayjs(date, 'YYYY-MM-DDTHH:mm:ss');

      // console.log(dateParse)
      const fechaFormateada = dateParse.format('YYYY-MM-DD HH:mm:ss');
      console.log(fechaFormateada)



      this.transactionService.updateDateLeaveAttendance(ide, fechaFormateada).pipe(
        tap(resp => {
          console.log(resp)
          this.toaster.info("Fecha de salida actualizada correctamente");
          this.findAll();
        }),
        catchError(err => {
          console.log(err)
          this.toaster.error("Error al actualizar la fecha de salida")
          return of(null);
        })
      ).subscribe();

    } else this.toaster.warning("Debe seleccionar una fecha de salida");
  }

  changePage(numberPage?: number) {

    // console.log("Number  of  page" +  numberPage)
    this.paramPaginator.page = numberPage || numberPage == 0 ? numberPage : this.paramPaginator.page;
    this.findAll();
  }

  delete(ide: any) {



    this.transactionService.deleteAttendance(ide as number).pipe(

      tap(resp => {
        console.log(resp)
        this.toaster.info("Asistencia eliminada correctamente");
        this.findAll();
      }),
      catchError(err => {
        console.log(err)
        this.toaster.error("Error al eliminar la asistencia")
        return of(null);
      })
    ).subscribe();
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

}
