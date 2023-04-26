import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { ReportParams } from 'src/app/core/models/page-render.model';
import { ReportService } from 'src/app/modules/report/services/report.service';
import { UtilFiltersService } from 'src/app/shared/services/util-filters.service';
import { typeModel } from 'src/app/utils/types';

@Component({
  selector: 'app-customer-editor',
  templateUrl: './customer-editor.component.html',
  styleUrls: ['./customer-editor.component.scss']
})
export class CustomerEditorComponent implements OnInit{

  flagClose = true;
  ideCustomer: number;
  nombre: string;
  typePanel: typeModel = 'DATA';
  statusBtn = false;
  constructor(
    private activePath: ActivatedRoute,
    private reportService: ReportService,
    private utilFiltersService: UtilFiltersService){}
  
  ngOnInit(): void {
    
    this.ideCustomer =  this.activePath.snapshot.params['ideCustomer'];
    // console.log(`Id Customer get : ${this.ideCustomer}`);

    this.activePath.params.subscribe(
      (params: Params) => {
        this.ideCustomer =  params['ideCustomer'];
      }
    );
  }
 
  onClickMenu(value:boolean){  

    this.flagClose = value;
  }

  generateReport(){

    // Se debe pasar obligatoriamente el parametro de tipo string y que sea igual a "REPORT"
    // no pasar nada de null o undefined, por que se valida
    this.utilFiltersService.eventFiltersEmit("REPORT");
  
    // Obtener objeto de parametros para generar el reporte
    const params: ReportParams = this.utilFiltersService.params; 
    
    // Pasar el ide del cliente para generar el reporte
    params.customer = this.ideCustomer.toString();

    // Pasar el tipo de reporte obteniendo el tipo de data que esta listada actualmente
    // params.typeReport = this.utilFiltersService.params.typeData; // esta tambien es una opcion

    // Pasar el tipo de panel que esta actualmente seleccionado, tiene asociado los mismos valores que el tipo de reporte
    params.typeReport= this.typePanel;

    params.typeAction = "REPORT";
    this.createPdf(params);
    // console.log("Parametros para generar el reporte", params);

  }



createPdf(param: any) {


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


setTipoPanel(value: typeModel){
  this.typePanel = value;

  this.statusBtn = this.typePanel != 'DATA';

  console.log("Tipo de panel", this.typePanel);
}

get title(){
  switch (this.typePanel) {
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
