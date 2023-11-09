import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TokenService } from 'src/app/modules/auth/service/token.service';
import { URL_PERFIL } from 'src/app/utils/constants-url-path';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarDosComponent implements OnInit {
 
  username: string = '';

  flagClose = true;
  @Output() newItemEvent = new EventEmitter<boolean>();

  constructor(
    private tolkenService: TokenService,

  ) { 

    this.username = this.tolkenService.getUsername() || '';

    this.flagClose = this.tolkenService.getFlagClose();
  }
  ngOnInit(): void {
    
  }

  onClickMenu(){


    this.flagClose = !this.tolkenService.getFlagClose();
    
    this.newItemEvent.emit(this.flagClose);
  }
  get getUrlProfile(){
    return URL_PERFIL;
  }

  get isCliente(){
    return this.tolkenService.isCliente();
  }
  logOut(){
    this.tolkenService.logOut();
  }
}
