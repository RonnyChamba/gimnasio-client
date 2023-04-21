import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PaginatorAttendanceAndMembresias } from 'src/app/core/models/page-render.model';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {


  private refreshDataTable = new Subject<PaginatorAttendanceAndMembresias | null>();
  constructor() { }


  get  getRefreshDataTab() {

    return this.refreshDataTable;
  }
  refreshDataTableAsObservable() {
    return this.refreshDataTable.asObservable();
  }

}
