import { Component, OnInit, TemplateRef } from '@angular/core';
import { typeModel } from 'src/app/utils/types';
import { UtilReportService } from '../../services/util.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent  implements OnInit {
  

  flagClose = true;
  constructor(
    private utilReport: UtilReportService,
    
    ){}

  ngOnInit(): void {
    
  }
  
  
  onClickMenu(value:boolean){  

    this.flagClose = value;
  }


  openModal(){

    console.log("Abrir modal");

    // this.modalService.open(FormCustomerComponent, {
    //   size: "lg"
    // });
  }


 viewReports( type: typeModel ){
    // alert("Inscripción"  + + type)  ;

    // this.typeReport = type;

    this.utilReport.getTypeReport.next(type);


  }


}
