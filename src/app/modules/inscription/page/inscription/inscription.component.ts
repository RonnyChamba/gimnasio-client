import { Component, OnInit } from '@angular/core';
import { typeModel } from 'src/app/utils/types';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent  implements OnInit{

  typeModel: typeModel = "INSCRIPTION";
  flagClose = true;

  constructor() { }
  ngOnInit(): void {
  }


  onClickMenu(value:boolean){  
    this.flagClose = value;
  }


}
