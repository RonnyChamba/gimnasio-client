import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilFiltersService {

  private eventFilters = new Subject<any| null>  ();
  constructor() { }
  
  eventFiltersEmit(value: any) {
    this.eventFilters.next(value);
  }

  eventFiltersObservable() {
    return this.eventFilters.asObservable();
  }
  
}
