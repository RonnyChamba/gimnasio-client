import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { InscriptionListPage } from 'src/app/core/models/inscription-model';
import { PageRender, PaginatorAttendanceAndMembresias } from 'src/app/core/models/page-render.model';
import { TypeOperationFormInsCustomer } from 'src/app/utils/utilForm';
import { CustomerService } from '../../services/customer.service';
import { FormCustomersComponent } from '../form-customers/form-customers.component';

@Component({
  selector: 'app-invoice-customer',
  templateUrl: './invoice-customer.component.html',
  styleUrls: ['./invoice-customer.component.scss']
})
export class InvoiceCustomerComponent implements OnInit, OnDestroy {


  @Input() idCustomer: number;

  listData: InscriptionListPage[];
  pageRender: PageRender;
  sumaTotalElements = 0;
  paramPaginator: PaginatorAttendanceAndMembresias = { page: 0, size: 5, typeUser: "all" };
  formData: FormGroup;

  // here add suscriptiones
  private subscription: Subscription = new Subscription();
  constructor(private customerService: CustomerService,
    private modalService: NgbModal,) { }

  ngOnInit(): void {

    this.createForm();
    this.findAll();
    this.onChangeFilter();
    this.addSucriptions();



  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // throw new Error('Method not implemented.');
  }

  private findAll() {

    // Por si llega undefiniden
    if (this.idCustomer) {
      this.customerService.findAllMembresiasByCustomer(this.idCustomer, this.paramPaginator).subscribe(resp => {

        // console.log(resp)
        this.listData = resp.data;
        this.pageRender = resp.page;
        this.calculSumaRegister();
      })
    }


  }
  private createForm() {

    this.formData = new FormGroup(
      {
        size: new FormControl(5, []),
        dateBegin: new FormControl(null, []),
        dateEnd: new FormControl(null, []),
        typeUser: new FormControl("all", []),
        typePay: new FormControl("", [])
      });
  }
  private addSucriptions() {

    this.subscription.add(

      this.customerService.getRefreshUpdateTableAttendanceObservable()
        .subscribe(resp => {


          this.findAll();
        })
    )

  }

  private onChangeFilter() {
    this.formData.valueChanges.subscribe(resp => {

      // let paginCurrent = this.paramPaginator.page;

      this.paramPaginator = resp as PaginatorAttendanceAndMembresias;

      // Cuando cambia algun filtro, siempre que empieza por la pgina 0
      this.paramPaginator.page = 0;

      // console.log(this.paramPaginator)
      this.findAll();
    })

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

    console.log( ide,write)


    const references = this.modalService.open(FormCustomersComponent, {
      size: "lg"
    });

    const param: TypeOperationFormInsCustomer = {
      type: 'updateInscription',
      ideOperation: ide,
      write,
    }

    
    references.componentInstance.operationForm = param;
  }

  generateReport(ide: number){

    alert("generar reporte")
  }

}
