import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { PaginatorDiary } from 'src/app/core/models/page-render.model';

@Injectable({
  providedIn: 'root'
})
export class DailyUtilService{

  private refreshFilterTable = new Subject<PaginatorDiary>();
  constructor() { }


  get getRefreshFilterTable(){
    return this.refreshFilterTable;
  }

   filterTableAsObservable() : Observable<PaginatorDiary> {
    return this.refreshFilterTable.asObservable();
  }

}
