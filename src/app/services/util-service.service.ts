import { Injectable } from '@angular/core';
import { LevelEnum, TypeExpenseEnum } from '../utils/enum/enumLevel';
import { TypePayEnum } from '../core/enum/pay-enum';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  
  // mapLevel = new Map<any, string>();
  mapLevel: any= [];
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
    this.mapLevel.push( {key: "No asignado", value: 'Ninguno'});
    this.mapLevel.push( {key: LevelEnum.PRINCIPIANTE, value: 'Principiante'});
    this.mapLevel.push( {key: LevelEnum.INTERMEDIO, value: 'Intermedio'});
    this.mapLevel.push( {key: LevelEnum.SENIOR, value: 'Senior'});
    
    // this.mapLevel.push(LevelEnum.INTERMEDIO, 'Intermedio');
    // this.mapLevel.push(LevelEnum.SENIOR, 'Senior');
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
