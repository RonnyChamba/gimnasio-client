import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TypePayEnum } from 'src/app/core/enum/pay-enum';
import { PaginatorCustomer } from 'src/app/core/models/page-render.model';

@Injectable({
  providedIn: 'root'
})
export class UtilCustomerService implements OnInit {

  private listTypePay: TypePayEnum [] =[];


  private refreshFilterTable = new Subject<PaginatorCustomer>();

  constructor() { 

    this.initPayEnum();
  }
  
  ngOnInit(): void {
   
  }

  get getListTypePayEnum(){
    return this.listTypePay;

  }

  get getRefreshFilterTable(){
    return this.refreshFilterTable;
  }

  private initPayEnum() {
 
    this.listTypePay.push(TypePayEnum.EFECTIVO);
    this.listTypePay.push(TypePayEnum.TRANSFERNCIA);
  }

  filterTableAsObservable() : Observable<PaginatorCustomer> {
    return this.refreshFilterTable.asObservable();
  }




}
 

