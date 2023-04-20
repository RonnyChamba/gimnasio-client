import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PaginatorAttendanceAndMembresias } from 'src/app/core/models/page-render.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {


  private subjetFilters = new Subject<PaginatorAttendanceAndMembresias | null>();
  
  constructor() { }


  get refresFilterTable() {
    return this.subjetFilters;
  }

  refreshFilterAsObservable() {
    return this.subjetFilters.asObservable();
  }
  
}
