import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-routines',
  templateUrl: './list-routines.component.html',
  styleUrls: ['./list-routines.component.scss']
})
export class ListRoutinesComponent implements OnInit {

  textAccordion = "más"; 

  ngOnInit(): void {
  
    
  }


  onAccordion(){
    
    this.textAccordion = this.textAccordion=='más' ? 'menos' : 'más';
  }
}