import { Injectable } from '@angular/core';
import { LevelEnum } from '../utils/enum/enumLevel';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  
  mapLevel = new Map<any, string>();

  constructor() { 
    this.initLevel();
  }

  
  get getMapLevel(){
    return this.mapLevel;
  }

  private initLevel() {
    this.mapLevel.set(LevelEnum.PRINCIPIANTE, 'Principiante');
    this.mapLevel.set(LevelEnum.INTERMEDIO, 'Intermedio');
    this.mapLevel.set(LevelEnum.SENIOR, 'Senior');
  }
}
