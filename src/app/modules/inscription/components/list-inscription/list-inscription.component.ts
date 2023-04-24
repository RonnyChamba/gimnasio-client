import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { InscriptionListPage } from 'src/app/core/models/inscription-model';
import { PageRender, PaginatorAttendanceAndMembresias } from 'src/app/core/models/page-render.model';
import { FormCustomersComponent } from 'src/app/modules/customer/components/form-customers/form-customers.component';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { TypeOperationFormInsCustomer } from 'src/app/utils/utilForm';
import { UtilFiltersService } from 'src/app/shared/services/util-filters.service';

@Component({
  selector: 'app-list-inscription',
  templateUrl: './list-inscription.component.html',
  styleUrls: ['./list-inscription.component.scss']
})
export class ListInscriptionComponent implements OnInit, OnDestroy {


  // Cuando el ide es 0 signfica que tiene que listar todas las inscripciones registradas en la base de datos
  // Cuando no es 0, equivale al id del cliente, y se listan las inscripciones del cliente en particular 
  @Input() idCustomer: number = 0;

  
  listData: InscriptionListPage[];
  pageRender: PageRender;
  sumaTotalElements = 0;
  paramPaginator: PaginatorAttendanceAndMembresias = { page: 0, size: 5, typeUser: "", typeData: "INSCRIPTION" };

  showDetails = false;
  showDetailsModality = false;
  showDetailsDateBegin = false;
  
  private subscription: Subscription = new Subscription();

  constructor(
    private customerService: CustomerService,
    private utilFiltersService: UtilFiltersService,
    private modalService: NgbModal,) { }

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


  private findAll() {

    this.paramPaginator.typeData = "INSCRIPTION";
    this.customerService.findAllMembresiasByCustomer(this.idCustomer, this.paramPaginator).subscribe(resp => {

      console.log(resp)
      this.listData = resp.data;
      this.pageRender = resp.page;
      this.calculSumaRegister();
    })
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


    alert("eliminar inscription")
    // this.customerService.deleteAttendance(ide).subscribe(resp=>{
    //   console.log(resp)
    // })
  }


  edit(ide: number, write: boolean, ideCustomer: any) {

    console.log(ide, write)


    const references = this.modalService.open(FormCustomersComponent, {
      size: "lg"
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
