import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { PaginatorExpense } from 'src/app/core/models/page-render.model';

@Injectable({
  providedIn: 'root'
})
export class UtilExpenseService {

  private refreshFilterTable = new Subject<PaginatorExpense>();
  constructor() { }


  get getRefreshFilterTable(){
    return this.refreshFilterTable;
  }

   filterTableAsObservable() : Observable<PaginatorExpense> {
    return this.refreshFilterTable.asObservable();
  }
}
