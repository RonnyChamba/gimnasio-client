import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  flagClose = true;

  onClickMenu(value:boolean){  

    this.flagClose = value;
  }
  
}
