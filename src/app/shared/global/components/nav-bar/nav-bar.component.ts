import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TokenService } from 'src/app/modules/auth/service/token.service';

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
  }
  ngOnInit(): void {
    
  }

  onClickMenu(){


    this.flagClose = !this.flagClose;
    
    this.newItemEvent.emit(this.flagClose);
  }

  logOut(){
    this.tolkenService.logOut();


  }

}
