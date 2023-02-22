import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-group-daily',
  templateUrl: './group-daily.component.html',
  styleUrls: ['./group-daily.component.scss']
})
export class GroupDailyComponent  implements OnInit{


  typeDaily:boolean= true;

  constructor(public modal: NgbActiveModal){}

  ngOnInit(): void {

   }

   changeTypeDaily(value:boolean){

    this.typeDaily = value;
   }
 
}

