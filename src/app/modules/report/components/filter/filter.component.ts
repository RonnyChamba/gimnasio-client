import { Component, OnDestroy, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { typeModel } from 'src/app/utils/types';
import { UtilReportService } from '../../services/util.service';
import { Subscription, catchError, of, tap } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { ReportService } from '../../services/report.service';
import { Modality } from 'src/app/core/models/modality-model';
import { Person } from 'src/app/core/models/person-model';
import { UtilService } from 'src/app/services/util-service.service';
import { ReportParams } from 'src/app/core/models/page-render.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'src/app/services/message.service';



@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

  @ViewChild('miBoton', { static: false }) miBoton: any;

  typeReport: typeModel;
  formData: FormGroup;
  modalities: Modality[] = [];
  typeExpenses: any = [];

  users: Person[] = [];

  private subscription = new Subscription();

  constructor(

    private utilReport: UtilReportService,
    private reportService: ReportService,
    private toater: ToastrService,
    private utilService: UtilService,
    private renderer: Renderer2,
    private messageService: MessageService
    ) { }
  ngOnInit(): void {

    console.log("typeReport", this.typeReport);
    this.createForm();
    this.addSubscription();

    this.typeExpenses = this.utilService.typeExpenses;
    // Agregar un elemento al inicio del arreglo
    this.typeExpenses.unshift({ key: "", value: "Todos" });
    // this.initFilters();
  }

  private initFilters() {

    if (this.typeReport) {

      this.loadFilterInscriptions();
    } else {
      console.log("No hay tipo de reporte");
    }


  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }

  private createForm() {

    this.formData = new FormGroup(
      {

        dateBegin: new FormControl("", []),
        dateEnd: new FormControl("", []),
        typeUser: new FormControl("", []),
        customer: new FormControl("", []),
        typePay: new FormControl("", []),
        modality: new FormControl("", []),
        typeReport: new FormControl("", []),
        typeExpense: new FormControl("", []),
      });
  }

  private addSubscription() {

    this.subscription.add(
      this.utilReport.refreshTypeReportAsObservable().subscribe((typeReport: typeModel) => {

        this.typeReport = typeReport;
        console.log("typeReport", this.typeReport);
        this.formData.get("typeReport")?.setValue(this.typeReport);


        this.initFilters();

        this.resetForm();
      }
      ));
  }

  private loadFilterInscriptions() {

    this.reportService.getFilterInscriptions().subscribe((resp: any) => {
      // console.log("resp", resp);

      this.modalities = resp.modalities;
      this.users = resp.users;

    });

  }

  generateReport() {

    console.log("formData", this.formData.value);

    const param = this.formData.value as ReportParams;
    param.typeAction = "REPORT";

    this.reportService.generateReportInscriptions(param, "blob").pipe(
      tap((resp: any) => {
        console.log("resp", resp);
        const blob = new Blob([resp], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        this.messageService.loading(false);
        window.open(url);
      }),
      catchError((err) => {
        console.log("err", err);

        this.messageService.loading(false);

        // alert("Error al generar el reporte");
        this.toater.error("Surguio un error, intentelo mas tarde");
        return of(null);
        // return throwError(err);
      }


      )).subscribe();

  }


  countReport() {

 
    this.messageService.loading(true);

    setTimeout(() =>{

        
    const param = this.formData.value as ReportParams;
    param.typeAction = "COUNT";
    this.reportService.generateReportInscriptions(param, "json").pipe(
      tap((resp: any) => {

        let count = Number.parseInt(resp);
        if (count<=0) {
          Swal.fire(
            'No se encontraron registros para el reporte',
            '',
            'info'
          )
        }else if (count > 0 && count <=100) {

          // disparar el evento click del boton para ocultar el offcanvas desde aqui
          this.renderer.selectRootElement(this.miBoton.nativeElement).click();
          this.generateReport();
        } else if (count >100 && count <=200 ) {
        this.messageService.loading(false);
          Swal.fire({
            title: '¿Desea generar el reporte?',
            text: `Se encontraron ${count} registros, esta operacion puede tardar unos minutos`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Generar de todos modos',
            cancelButtonText: 'Cancelar'
          }).then((result) => {

            if (result.isConfirmed) {

              // disparar el evento click del boton para ocultar el offcanvas desde aqui
              this.renderer.selectRootElement(this.miBoton.nativeElement).click();
              this.generateReport();
            }
          }
          )
        }else if (count >200) {

        this.messageService.loading(false);

          Swal.fire(
            'No se puede generar el reporte',
            `Se encontrarón ${count} registros, solo se puede generar reportes hasta maximo 200 registros por consulta`,
            'error'
          )
        }
        console.log("resp", resp);

      }
      ),
      catchError((err) => {
        // console.log("err", err);
        // alert("Error  realizar consulta");

      
        this.toater.error("Surguio un error, intentelo mas tarde");
        return of(null);
        // return throwError(err);
      })

    ).subscribe();
    }, 400 ) 

  


  }


  get title() {

    switch (this.typeReport) {
      case "INSCRIPTION":
        return "Membresías";
      case "DAILY":
        return "Diarios";
      case "EXPENSE":
        return "Gastos";

      case "CATEGORY":
        return "Categorias";

      case "ATTENDANCE":
        return "Asistencias";
      default:

        return "Reportes";
    }

  }

  private resetForm() {

    this.formData.patchValue({
      dateBegin: "",
      dateEnd: "",
      typeUser: "",
      customer: "",
      typePay: "",
      modality: "",
      typeExpense: "",

    });
  }


}
