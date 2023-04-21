import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InscriptionService } from '../../services/inscription.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent  implements OnInit{

  flagClose = true;
  formData: FormGroup;

  constructor(
    private inscriptionService: InscriptionService 
    ) { }
  ngOnInit(): void {
    this.createForm(); 

  this.formData.valueChanges.subscribe(value => {
      // console.log(value);

      this.inscriptionService.getRefreshDataTab.next(value);
    }
    );
  }


  onClickMenu(value:boolean){  
    this.flagClose = value;
  }
  private createForm() {

    this.formData = new FormGroup(
      {
        size: new FormControl(5, []),
        dateBegin: new FormControl(null, []),
        dateEnd: new FormControl(null, []),
        typeUser: new FormControl("", []),
        typePay: new FormControl("", [])
      });
  }


}
