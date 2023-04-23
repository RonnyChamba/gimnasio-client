import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { typeModel } from 'src/app/utils/types';
import { CustomerService } from '../../services/customer.service';
import { PageRender, PaginatorAttendanceAndMembresias } from 'src/app/core/models/page-render.model';
import { Subscription, catchError, of, tap } from 'rxjs';
import { EvolutionList } from 'src/app/core/models/evolution-model';
import { UtilFiltersService } from 'src/app/shared/services/util-filters.service';

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
    private utilFiltersService: UtilFiltersService) { }

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


  private findAll(){
    
    this.paramPaginator.typeData="EVOLUTION";

    this.customerService.findAllMembresiasByCustomer(this.idCustomer, this.paramPaginator)
    .pipe(
      tap (resp => {

        console.log("Respuesta del servicio", resp)

        this.listData = resp.data;
        this.pageRender = resp.page;
        // this.sumaTotalElements = resp.pageRender.totalElements;

        this.calculSumaRegister();
      }),
      catchError(err => {
        console.log("Error en el servicio", err)
        return of(null);
      }
      )
  
    ).subscribe();

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
