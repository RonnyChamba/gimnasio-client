import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilAdminService {

  private subjectModality = new Subject<any>();
  private subjectReloadTableUser = new Subject<any>();

  constructor() { }


  get getSubjectModality() {
    return this.subjectModality;
  }


  get getSubjectReloadTableUser() {
    return this.subjectReloadTableUser;
  }


  refresgListModality() {
    return this.subjectModality.asObservable();
  }
}
