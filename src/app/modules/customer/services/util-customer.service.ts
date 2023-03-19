import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TypePayEnum } from 'src/app/core/enum/pay-enum';

@Injectable({
  providedIn: 'root'
})
export class UtilCustomerService implements OnInit {

  private listTypePay: TypePayEnum [] =[];

  private refreshNumPages = new Subject<number>();
  private refreshSearch = new Subject<string>();

  constructor() { 

    this.initPayEnum();
  }
  
  ngOnInit(): void {
   
  }

  get getListTypePayEnum(){
    return this.listTypePay;

  }

  private initPayEnum() {
 
    this.listTypePay.push(TypePayEnum.EFECTIVO);
    this.listTypePay.push(TypePayEnum.TRANSFERNCIA);
  }

  getRefreshObservable() : Observable<number> {
    return this.refreshNumPages.asObservable();
  }
  

  get getRefreshNumPages() {
    return this.refreshNumPages;
  }

  getRefreshObservableSearch() : Observable<string> {
    return this.refreshSearch.asObservable();
  }
  
  
  get getRefreshSearch() {
    return this.refreshSearch;
  }
  

}
 

