import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-routine',
  templateUrl: './list-routine.component.html',
  styleUrls: ['./list-routine.component.scss']
})
export class ListRoutineComponent implements OnInit {

  textAccordion = "más"; 

  ngOnInit(): void {
  
    
  }


  onAccordion(){
    
    this.textAccordion = this.textAccordion=='más' ? 'menos' : 'más';
  }
}
