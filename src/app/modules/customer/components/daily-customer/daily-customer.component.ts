import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Attendance } from 'src/app/core/models/attendance.model';
import { PageRender, PaginatorAttendanceAndMembresias } from 'src/app/core/models/page-render.model';
import { CustomerService } from '../../services/customer.service';
import * as dayjs from "dayjs";
import { TransactionSrService } from 'src/app/services/transaction-sr.service';

@Component({
  selector: 'app-daily-customer',
  templateUrl: './daily-customer.component.html',
  styleUrls: ['./daily-customer.component.scss']
})
export class DailyCustomerComponent implements OnInit, OnDestroy {

  @Input() idCustomer: number;

  listData: Attendance[];
  pageRender: PageRender;
  sumaTotalElements = 0;
  paramPaginator: PaginatorAttendanceAndMembresias = { page: 0, size: 5, typeUser: "", typeData: "ATTENDANCE"};
  formData: FormGroup;

  // here add suscriptiones
  private subscription: Subscription = new Subscription();

  constructor(private customerService: CustomerService,
    private transactionService: TransactionSrService) { }

  ngOnInit(): void {
    this.createForm();
    this.findAll();
    this.onChangeFilter();

    this.addSucriptions();
  }

  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }

  private addSucriptions() {

  }

  private onChangeFilter() {
    this.formData.valueChanges.subscribe(resp => {

      this.paramPaginator = resp as PaginatorAttendanceAndMembresias;
      
      this.paramPaginator.typeData = "ATTENDANCE";
      // Cuando cambia algun filtro, siempre que empieza por la pgina 0
      this.paramPaginator.page = 0;

      this.findAll();
    })

  }
  private findAll() {

    this.customerService.findAllMembresiasByCustomer(this.idCustomer, this.paramPaginator).subscribe(resp => {
      
      console.log(resp)
      this.listData = resp.data;
      this.pageRender = resp.page;
      this.calculSumaRegister();
    })

  }

  private createForm() {

    this.formData = new FormGroup(
      {
        size: new FormControl(5, []),
        dateBegin: new FormControl(null, []),
        dateEnd: new FormControl(null, []),
        typeUser: new FormControl("", []),
      });
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

  delete(ide: any) {


    this.transactionService.deleteAttendance(ide as number).subscribe(resp => {
      console.log(resp)
      alert("asistencia eliminada")
      this.findAll  ();
    })

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

      this.transactionService.updateDateLeaveAttendance(ide, fechaFormateada).subscribe(resp => {

        console.log(resp)
        alert("asistencia actualizada")
        console.log("asitencia actualizada..")
      })

    } else console.log("fecha vacia")
  }

}
