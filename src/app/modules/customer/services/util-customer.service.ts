import { Injectable, OnInit } from '@angular/core';
import { TypePayEnum } from 'src/app/core/enum/pay-enum';

@Injectable({
  providedIn: 'root'
})
export class UtilCustomerService implements OnInit {

  private listTypePay: TypePayEnum [] =[];

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

}
 

