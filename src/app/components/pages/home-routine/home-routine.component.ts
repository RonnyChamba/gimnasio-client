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


  onClickMenu(){  

    this.flagClose = !this.flagClose;
  }

  openModal(){

  
    // this.modalService.open(FormExerciseComponent, {
    //   size: "lg"
    // });
  }


}
