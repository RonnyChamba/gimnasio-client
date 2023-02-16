import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-exercise',
  templateUrl: './list-exercise.component.html',
  styleUrls: ['./list-exercise.component.scss']
})
export class ListExerciseComponent  implements OnInit{

  textAccordion = "más"; 
 
  ngOnInit(): void {
    
  }


  onAccordion(){
    
    this.textAccordion = this.textAccordion=='más' ? 'menos' : 'más';
  }

}
