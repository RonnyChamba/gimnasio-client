import { Injectable } from '@angular/core';
import { LevelEnum, TypeExpenseEnum } from '../utils/enum/enumLevel';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  
  mapLevel = new Map<any, string>();
  typeExpenses:any = [];

  constructor() { 
    this.initLevel();
    this.initTypeExpenses();
  }

  
  get getMapLevel(){
    return this.mapLevel;
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

 
}
