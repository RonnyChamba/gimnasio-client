import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { typeModel } from 'src/app/utils/types';
import { Customer } from 'src/app/core/models/customer-model';
import { UtilFiltersService } from 'src/app/shared/services/util-filters.service';
import { ReportService } from 'src/app/modules/report/services/report.service';
import { tap, catchError, of } from 'rxjs';
import { ReportParams } from 'src/app/core/models/page-render.model';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-info-customer',
  templateUrl: './info-customer.component.html',
  styleUrls: ['./info-customer.component.scss'],
})
export class InfoCustomerComponent implements OnInit {
  customerCurrent: Customer;
  @Input() idCustomer: number;

  // Para pasarel name al padre  componente editor
  @Output() eventNameCustomer = new EventEmitter<string>();

  eventChangeStatus: boolean;
  namePanelInfo: typeModel = 'DATA';

  constructor(
    private utilFiltersService: UtilFiltersService,
    private reportService: ReportService,
    private toaster: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

  }

  changePanel(namePanelInfo: typeModel) {
    // If touch in same button than current component
    if (this.namePanelInfo == namePanelInfo) return;

    this.namePanelInfo = namePanelInfo;
  }

  public getCustomer(customer: Customer) {
    this.customerCurrent = customer;
    this.eventNameCustomer.next(this.customerCurrent.name);

  }



  generateReport() {

    this.messageService.loading(true);

    // Se debe pasar obligatoriamente el parametro de tipo string y que sea igual a "REPORT"
    // no pasar nada de null o undefined, por que se valida
    this.utilFiltersService.eventFiltersEmit("REPORT");

    // Obtener objeto de parametros para generar el reporte
    const params: ReportParams = this.utilFiltersService.params;

    // Pasar el ide del cliente para generar el reporte
    params.customer = this.idCustomer.toString();

    // Pasar el tipo de reporte obteniendo el tipo de data que esta listada actualmente
    // params.typeReport = this.utilFiltersService.params.typeData; // esta tambien es una opcion

    // Pasar el tipo de panel que esta actualmente seleccionado, tiene asociado los mismos valores que el tipo de reporte
    params.typeReport = this.namePanelInfo;

    params.typeAction = "REPORT";


    setTimeout(() =>{

      // console.log("Parametros para generar el reporte", params);
    // return;
    this.createPdf(params);
    // console.log("Parametros para generar el reporte", params);
    },  400 )
    

  }



  createPdf(param: any) {


    this.reportService.generateReportInscriptions(param, "blob").pipe(
      tap((resp: any) => {
        console.log("resp", resp);
        const blob = new Blob([resp], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        this.messageService.loading(false);
        window.open(url);
      }),
      catchError((err) => {
        // console.log("err", err);

        this.messageService.loading(false);

        alert("Error al generar el reporte");
        this.toaster.error("Error al generar el reporte");
        return of(null);
  
      }


      )).subscribe();
  }

  get title() {
    switch (this.namePanelInfo) {
      case 'DATA':
        return 'Datos';
      case 'ATTENDANCE':
        return 'Asistencia';
      case 'INSCRIPTION':
        return 'Membresía';
      case 'EVOLUTION':
        return 'Evolución';
      default:
        return 'Datos';
    }
  }
}
