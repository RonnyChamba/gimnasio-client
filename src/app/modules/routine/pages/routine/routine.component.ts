import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss']
})
export class RoutineComponent implements OnInit{
  
  flagClose = true;
  
  constructor (){}
  
  ngOnInit(): void {
   
  }


  onClickMenu(value:boolean){  

    this.flagClose = value;
  }

  openModal(){

  
    // this.modalService.open(FormExerciseComponent, {
    //   size: "lg"
    // });
  }


}