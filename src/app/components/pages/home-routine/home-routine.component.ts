import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-routine',
  templateUrl: './home-routine.component.html',
  styleUrls: ['./home-routine.component.scss']
})
export class HomeRoutineComponent  implements OnInit{
  
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
