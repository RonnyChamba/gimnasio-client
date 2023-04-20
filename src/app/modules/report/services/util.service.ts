import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { typeModel } from 'src/app/utils/types';

@Injectable({
  providedIn: 'root'
})
export class UtilReportService implements OnInit {

  private subjectTypeReport = new Subject<typeModel>();
  
  constructor() { }

  ngOnInit(): void {

  }

  get getTypeReport(): Subject<typeModel> {
    return this.subjectTypeReport;
  }

  refreshTypeReportAsObservable() {
 
 return   this.subjectTypeReport.asObservable();
  }

}
