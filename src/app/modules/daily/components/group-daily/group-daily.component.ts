import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-group-daily',
  templateUrl: './group-daily.component.html',
  styleUrls: ['./group-daily.component.scss']
})
export class GroupDailyComponent  implements OnInit{

  // typeDaily:boolean= true;

  @Input("ideDaily") ideDaily: number;

  constructor(public modal: NgbActiveModal){}

  ngOnInit(): void {

    console.log(this.ideDaily)

   }

  //  changeTypeDaily(value:boolean){

  //   this.typeDaily = value;
  //  }
 
}

