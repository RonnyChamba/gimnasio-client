import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Attendance } from 'src/app/core/models/attendance.model';
import { PageRender, PaginatorAttendanceAndMembresias } from 'src/app/core/models/page-render.model';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { TransactionSrService } from 'src/app/services/transaction-sr.service';
import * as dayjs from "dayjs";
import { AttendanceService } from '../../services/attendance.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-attendance',
  templateUrl: './list-attendance.component.html',
  styleUrls: ['./list-attendance.component.scss']
})
export class ListAttendanceComponent  implements OnInit, OnDestroy{
  

  listData: Attendance[];
  pageRender: PageRender;
  sumaTotalElements = 0;
  paramPaginator: PaginatorAttendanceAndMembresias = { page: 0, size: 5, typeUser: "", typeData: "ATTENDANCE"};

  subscription: Subscription = new Subscription();

  constructor(
      private customerService: CustomerService,
      private transactionService: TransactionSrService,
      private attendanceService: AttendanceService
    ) { }
    ngOnInit(): void {
      this.findAll();

      this.subscription.add(
        this.attendanceService.refreshFilterAsObservable()
          .subscribe(resp => {

            // puede retonar null o un objeto con los datos de los filtros
            if (resp) {
              this.paramPaginator = resp;
              this.paramPaginator.typeData = "ATTENDANCE";
              this.paramPaginator.page = 0;
            }
            this.findAll();
          }
          )
      )
    }

    ngOnDestroy(): void {
      
      this.subscription.unsubscribe();

    }
  private findAll() {

    // el valor 0 representa que no es ningun cliente por lo tanto debe traer todos los registros de asistencia
    this.customerService.findAllMembresiasByCustomer(0, this.paramPaginator).subscribe(resp => {
      
      console.log(resp)
      this.listData = resp.data;
      this.pageRender = resp.page;
      this.calculSumaRegister();
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

    } else alert("La fecha no es valida")
  }

  changePage(numberPage?: number) {

    // console.log("Number  of  page" +  numberPage)
    this.paramPaginator.page = numberPage || numberPage == 0 ? numberPage : this.paramPaginator.page;
    this.findAll();
  }

  delete(ide: any ){


    this.transactionService.deleteAttendance(ide as number).subscribe(resp => {
      console.log(resp)
      alert("asistencia eliminada")

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

}
