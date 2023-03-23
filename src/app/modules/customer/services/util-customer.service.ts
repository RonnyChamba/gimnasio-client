import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TypePayEnum } from 'src/app/core/enum/pay-enum';
import { FilterProperties } from 'src/app/core/interfaces/filter-properties.inteface';

@Injectable({
  providedIn: 'root'
})
export class UtilCustomerService implements OnInit {

  private listTypePay: TypePayEnum [] =[];



  private refreshFilterTable = new Subject<FilterProperties>();

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



  filterTableAsObservable() : Observable<FilterProperties> {
    return this.refreshFilterTable.asObservable();
  }
  

  

}
 

