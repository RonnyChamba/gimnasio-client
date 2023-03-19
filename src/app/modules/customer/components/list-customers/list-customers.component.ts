import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/core/models/customer-model';
import {
  PageRender,
  paramsPaginator,
} from 'src/app/core/models/page-render.model';
import { CustomerService } from '../../services/customer.service';
import { UtilCustomerService } from '../../services/util-customer.service';
import { FormCustomersComponent } from '../form-customers/form-customers.component';
import { FormUpdateCustomerComponent } from '../form-update-customer/form-update-customer.component';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss'],
})
export class ListCustomersComponent implements OnInit, OnDestroy {
  listData: Customer[] = [];
  @Input('size') size: number;
  pageRender: PageRender;
  paramPaginator: paramsPaginator = { page: 0, size: 5, typeFilter: true };

  searchText: string;
  sumaTotalElements = 0;

  // here add suscriptiones
  private subscription: Subscription = new Subscription();

  constructor(
    private modalService: NgbModal,
    private customerService: CustomerService,
    private utilCustomerService: UtilCustomerService
  ) {}

  ngOnInit(): void {
    // console.log('size default' + this.size);
    this.listdAll();

    // Add una subcriscion in select amount register
    this.subscription.add(
      this.utilCustomerService
        .getRefreshObservable()
        .subscribe((sizePaginator) => {

          this.paramPaginator.size = sizePaginator;

          // // Verify if exists a text in search input
          // if (this.searchText) {
          //   this.paramPaginator.typeFilter = false;
          //   this.paramPaginator.valueSearch = this.searchText;
          // }else this.paramPaginator.typeFilter = true;

          // this.changePage(this.paramPaginator.page);
          this.changePage();
        })
    );

    // Add una subcriscion
    this.subscription.add(
      this.utilCustomerService
        .getRefreshObservableSearch()
        .subscribe((searchText) => {

          this.searchText = searchText;

          this.paramPaginator.valueSearch = this.searchText;

          // if (this.searchText) {
          //   // Le indica al filtro que busca los clientes pero mediante busqueda
          //   this.paramPaginator.typeFilter = false;
          //   this.paramPaginator.valueSearch = searchText;
          // }else {
          //   this.paramPaginator.typeFilter = true;
          //   // this.paramPaginator.valueSearch = textSearh;
          // }

          // this.listdAll();

          // console.log(searchText);
          this.changePage();
        })
    );

    // this.calculSumaRegister();
  }

  ngOnDestroy(): void {
    // UnSubcribe, this is necesary becaouse the subcripciones se repiten
    this.subscription.unsubscribe();
  }

  listdAll() {
    this.customerService.findAll(this.paramPaginator).subscribe((resp) => {
      this.listData = resp.data;
      this.pageRender = resp.page;
      // this.sumaTotalElements+= this.listData.length;
      console.log(resp);
      this.calculSumaRegister();
    });
  }
  editCustomer(ide: number) {
    console.log('Abrir modal customer');

    const references = this.modalService.open(FormCustomersComponent, {
      size: 'lg',
    });

    references.componentInstance.ideCustomer = ide;
  }

  changePage(numberPage?: number) {
    
    console.log(numberPage)
    this.paramPaginator.page = numberPage || numberPage==0? numberPage: this.paramPaginator.page;
   this.paramPaginator.typeFilter = this.paramPaginator.valueSearch? false: true;
  // //  this.paramPaginator.valueSearch = this.searchText;

  // console.log(this.paramPaginator)


    // this.paramPaginator.page = numberPage;
  //  this.paramPaginator.typeFilter = this.paramPaginator.valueSearch? false: true;
  //  this.paramPaginator.valueSearch = this.searchText;



    // Por segurida, true representa que hara la cnsulta normal, no por busqueda
    // this.paramPaginator.typeFilter = true;
    // console.log(this.paramPaginator)

    this.listdAll();
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
