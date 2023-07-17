import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { typeModel } from 'src/app/utils/types';
import { CustomerService } from '../../services/customer.service';
import { PageRender, PaginatorAttendanceAndMembresias } from 'src/app/core/models/page-render.model';
import { Subscription, catchError, of, tap } from 'rxjs';
import { EvolutionList } from 'src/app/core/models/evolution-model';
import { UtilFiltersService } from 'src/app/shared/services/util-filters.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-evolution-customer',
  templateUrl: './evolution-customer.component.html',
  styleUrls: ['./evolution-customer.component.scss']
})
export class EvolutionCustomerComponent implements OnInit, OnDestroy {

  @Input() idCustomer: number;
  typeModel: typeModel = "EVOLUTION";

  listData: EvolutionList[];
  pageRender: PageRender;
  sumaTotalElements = 0;
  paramPaginator: PaginatorAttendanceAndMembresias = { page: 0, size: 5, typeUser: "", typeData: "EVOLUTION" };

  private subscription: Subscription = new Subscription();
  constructor(
    private customerService: CustomerService,
    private utilFiltersService: UtilFiltersService,
    private messageService: MessageService
    ) { }

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
        console.log("Respuesta del filtro", resp);

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



    setTimeout ( () =>{

      this.paramPaginator.typeData = "EVOLUTION";

    this.customerService.findAllMembresiasByCustomer(this.idCustomer, this.paramPaginator)
      .pipe(
        tap(resp => {

          console.log("Respuesta del servicio", resp)

          this.listData = resp.data;
          this.pageRender = resp.page;
          // this.sumaTotalElements = resp.pageRender.totalElements;

          this.calculSumaRegister();
          this.messageService.loading(false);
        }),
        catchError(err => {
          this.messageService.loading(false);
          
          console.log("Error en el servicio", err)
          return of(null);
        }
        )

      ).subscribe();

    }, 200 );

    
  }

  changePage(numberPage: number) {

    // console.log("Number  of  page" +  numberPage)
    this.paramPaginator.page = numberPage || numberPage == 0 ? numberPage : this.paramPaginator.page;
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
}
