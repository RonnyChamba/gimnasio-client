import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { typeReport } from 'src/app/utils/types';

@Injectable({
  providedIn: 'root'
})
export class UtilReportService implements OnInit {

  private subjectTypeReport = new Subject<typeReport>();
  
  constructor() { }

  ngOnInit(): void {

  }

  get getTypeReport(): Subject<typeReport> {
    return this.subjectTypeReport;
  }

  refreshTypeReportAsObservable() {
 
 return   this.subjectTypeReport.asObservable();
  }

}
