import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PaginatorDiary } from 'src/app/core/models/page-render.model';

@Injectable({
  providedIn: 'root'
})
export class UtilCategoryService {

  private refreshFilterTable = new Subject<PaginatorDiary>();
  constructor() { }


  get getRefreshFilterTable(){
    return this.refreshFilterTable;
  }

   filterTableAsObservable() : Observable<PaginatorDiary> {
    return this.refreshFilterTable.asObservable();
  }
}
