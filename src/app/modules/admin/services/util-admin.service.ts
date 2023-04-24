import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilAdminService {

  private subjectModality = new Subject<any>();
  constructor() { }


  get getSubjectModality() {
    return this.subjectModality;
  }


  refresgListModality() {
    return this.subjectModality.asObservable();
  }
}
