import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { typeModel } from 'src/app/utils/types';
import { UtilReportService } from '../../services/util.service';
import { Subscription, catchError, of, tap } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { ReportService } from '../../services/report.service';
import { Modality } from 'src/app/core/models/modality-model';
import { Person } from 'src/app/core/models/person-model';

import * as dayjs from 'dayjs';
import { UtilService } from 'src/app/services/util-service.service';
import { ReportParams } from 'src/app/core/models/page-render.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {


  typeReport: typeModel;
  formData: FormGroup;
  modalities: Modality[] = [];
  typeExpenses:any = [];

  users: Person[] = [];

  private subscription = new Subscription();

  constructor(

    private utilReport: UtilReportService,
    private reportService: ReportService,
    private utilService: UtilService,) { }
  ngOnInit(): void {

    console.log("typeReport", this.typeReport);
    this.createForm();
    this.addSubscription();

    this.typeExpenses = this.utilService.typeExpenses;
    // Agregar un elemento al inicio del arreglo
    this.typeExpenses.unshift({key:   "", value: "Todos"});
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
      console.log("resp", resp);

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
        window.open(url);
      }),
      catchError((err) => {
        console.log("err", err);

        alert("Error al generar el reporte");
        return of(null);
        // return throwError(err);
      }


      )).subscribe();

  }


  countReport() {

    const param = this.formData.value as ReportParams;
    param.typeAction = "COUNT";

    this.reportService.generateReportInscriptions(param, "json").pipe(
      tap((resp: any) => {
        console.log("resp", resp);
        alert(`Se encontraron ${resp} registros`);
      }
      ),
      catchError((err) => {
        console.log("err", err);
        alert("Error  realizar consulta");
        return of(null);
        // return throwError(err);
      })

      ).subscribe();


  }


  get title() {

    switch (this.typeReport) {
      case "INSCRIPTION":
        return "Inscripciones";
      case "DAILY":
        return "Diarios";
      case "EXPENSE":
        return "Gastos";

      case "CATEGORY":
        return "Categorias";
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
