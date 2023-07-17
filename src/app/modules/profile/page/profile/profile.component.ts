import { Component } from '@angular/core';
import { TokenService } from 'src/app/modules/auth/service/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {


  flagClose = true;


  constructor(
    private tokenService: TokenService
    ){

      this.flagClose = this.tokenService.getFlagClose();
    }
  

  onClickMenu(value:boolean){  

    this.flagClose = value;
    this.tokenService.setFlagClose(this.flagClose);
  }
  
}
