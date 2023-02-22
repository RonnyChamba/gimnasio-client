import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-routine-editor',
  templateUrl: './routine-editor.component.html',
  styleUrls: ['./routine-editor.component.scss']
})
export class RoutineEditorComponent implements OnInit {

  flagClose = true;

  constructor(){}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  onClickMenu(value: boolean){  

    this.flagClose = value;
  }

  openModal(){

  
    // this.modalService.open(FormExerciseComponent, {
    //   size: "lg"
    // });
  }

}