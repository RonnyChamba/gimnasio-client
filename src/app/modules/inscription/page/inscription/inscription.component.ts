import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/modules/auth/service/token.service';
import { typeModel } from 'src/app/utils/types';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent  implements OnInit{

  typeModel: typeModel = "INSCRIPTION";
  flagClose = true;

  constructor(
    private tokenService: TokenService
    ){
      this.flagClose = this.tokenService.getFlagClose();
    }
  
  ngOnInit(): void {
  }


  onClickMenu(value:boolean){  
    this.flagClose = value;

    this.tokenService.setFlagClose(this.flagClose);
  }


}
