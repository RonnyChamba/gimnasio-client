import { Component} from '@angular/core';

@Component({
  selector: 'app-form-home',
  templateUrl: './form-home.component.html',
  styleUrls: ['./form-home.component.scss']
})
export class FormHomeComponent {


  flagClose = true;

  constructor(){}


  onClickMenu(){  

    this.flagClose = !this.flagClose;
  }


}
