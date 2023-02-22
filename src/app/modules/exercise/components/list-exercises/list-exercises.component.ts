import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-exercises',
  templateUrl: './list-exercises.component.html',
  styleUrls: ['./list-exercises.component.scss']
})
export class ListExercisesComponent  implements OnInit{

  textAccordion = "más"; 
 
  ngOnInit(): void {
    
  }


  onAccordion(){
    
    this.textAccordion = this.textAccordion=='más' ? 'menos' : 'más';
  }


}
