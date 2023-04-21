import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { InscriptionListPage } from 'src/app/core/models/inscription-model';
import { PageRender, PaginatorAttendanceAndMembresias } from 'src/app/core/models/page-render.model';
import { FormCustomersComponent } from 'src/app/modules/customer/components/form-customers/form-customers.component';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { TypeOperationFormInsCustomer } from 'src/app/utils/utilForm';
import { InscriptionService } from '../../services/inscription.service';

@Component({
  selector: 'app-list-inscription',
  templateUrl: './list-inscription.component.html',
  styleUrls: ['./list-inscription.component.scss']
})
export class ListInscriptionComponent implements OnInit, OnDestroy {


  @Input() idCustomer: number = 0;

  listData: InscriptionListPage[];
  pageRender: PageRender;
  sumaTotalElements = 0;
  paramPaginator: PaginatorAttendanceAndMembresias = { page: 0, size: 5, typeUser: "", typeData: "INSCRIPTION" };

  private subscription: Subscription = new Subscription();

  constructor(
    private customerService: CustomerService,
    private inscriptionService: InscriptionService,
    private modalService: NgbModal,) { }

  ngOnInit(): void {

    console.log("idCustomer", this.idCustomer)
    this.findAll();
    this.addSubscription();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private addSubscription() {
    this.subscription.add(
      this.inscriptionService.refreshDataTableAsObservable().subscribe(resp => {

        // Filtro de busqueda
        if (resp) {
          this.paramPaginator = resp as PaginatorAttendanceAndMembresias;
          // Cuando cambia algun filtro, siempre que empieza por la pgina 0
          this.paramPaginator.page = 0;
        } // actaulizada la tabla despues de eliminar o editar la inscripcion

        this.paramPaginator.typeData = "INSCRIPTION";

        this.findAll();

        // this.findAll();
      })
    );
  }


  private findAll() {

    // Por si llega undefiniden
    // if (this.idCustomer) {
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

  changePage(numberPage?: number) {

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


  edit(ide: number, write: boolean) {

    console.log(ide, write)


    const references = this.modalService.open(FormCustomersComponent, {
      size: "lg"
    });

    const param: TypeOperationFormInsCustomer = {
      type: 'updateInscription',

      // Enviar el ide de la inscripcion a editar
      ideInscription: ide,
      // pasamos el ide del cliente para luego el form para editar la insscription, validar la fecha de inicio
      ideCustomer: this.idCustomer,
      write,
    }


    references.componentInstance.operationForm = param;
  }

  generateReport(ide: number) {

    alert("generar reporte")
  }

}