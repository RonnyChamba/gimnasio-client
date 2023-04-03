import { Injectable } from '@angular/core';
import { LevelEnum, TypeExpenseEnum } from '../utils/enum/enumLevel';
import { TypePayEnum } from '../core/enum/pay-enum';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  
  mapLevel = new Map<any, string>();
  typeExpenses:any = [];
  listTypePay: TypePayEnum[] = [];

  constructor() { 
    this.initLevel();
    this.initTypeExpenses();
    this.initPayEnum();
  }

  
  get getMapLevel(){
    return this.mapLevel;
  }

  get getListTypePayEnum(){
    return this.listTypePay;

  }

  private initLevel() {
    this.mapLevel.set(LevelEnum.PRINCIPIANTE, 'Principiante');
    this.mapLevel.set(LevelEnum.INTERMEDIO, 'Intermedio');
    this.mapLevel.set(LevelEnum.SENIOR, 'Senior');
  }
  private initTypeExpenses() {
    
    this.typeExpenses.push({key:   TypeExpenseEnum.OTROS, value: "Otros"});
    this.typeExpenses.push({key:   TypeExpenseEnum.SALARIO, value: "Salario"});
    this.typeExpenses.push({key:   TypeExpenseEnum.ALIMENTACION, value: "Alimentación"});
    this.typeExpenses.push({key:   TypeExpenseEnum.TRANSPORTE, value: "Transporte"});
    this.typeExpenses.push({key:   TypeExpenseEnum.TIENDA, value: "Tienda"});
    this.typeExpenses.push({key:   TypeExpenseEnum.FACTURA, value: "Factura"});
   
  }

  
  private initPayEnum() {
 
    this.listTypePay.push(TypePayEnum.EFECTIVO);
    this.listTypePay.push(TypePayEnum.TRANSFERNCIA);
  }

 
}
