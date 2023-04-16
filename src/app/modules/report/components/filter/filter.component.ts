import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { typeReport } from 'src/app/utils/types';
import { UtilReportService } from '../../services/util.service';
import { Subscription, catchError, of, tap } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { ReportService } from '../../services/report.service';
import { Modality } from 'src/app/core/models/modality-model';
import { Person } from 'src/app/core/models/person-model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {


  typeReport: typeReport;
  formData: FormGroup;

  modalities: Modality[] = [];

  users: Person[] = [];

  private subscription = new Subscription();

  constructor(

    private utilReport: UtilReportService,
    private reportService: ReportService) { }
  ngOnInit(): void {

    console.log("typeReport", this.typeReport);
    this.createForm();
    this.addSubscription();
    // this.initFilters();
  }

  private initFilters() {

    if (this.typeReport) {

      this.loadFilterInscriptions();
    }else {
      console.log("No hay tipo de reporte");
    }


  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }

  private createForm() {

    this.formData = new FormGroup(
      {
      
        dateBegin: new FormControl(null, []),
        dateEnd: new FormControl(null, []),
        user: new FormControl("all", []),
        customer: new FormControl(null, []),
        typePay: new FormControl("all", []),
        modality: new FormControl("all", []),
      });
  }

  private addSubscription() {

    this.subscription.add(
      this.utilReport.refreshTypeReportAsObservable().subscribe((typeReport: typeReport) => {

        this.typeReport = typeReport;
        console.log("typeReport", this.typeReport);

        // this.initFilters();  
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

    this.reportService.generateReportInscriptions().pipe(
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

  get title() {

    switch (this.typeReport) {
      case "inscriptions":
        return "Inscripciones";
      case "dailies":
        return "Diarios";
      case "expenses":
        return "Gastos";

      case "categories":
        return "Categorias";
      default:

        return "Reportes";
    }

  }

}
