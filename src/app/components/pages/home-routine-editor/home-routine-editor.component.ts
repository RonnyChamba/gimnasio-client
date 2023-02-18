import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-routine-editor',
  templateUrl: './home-routine-editor.component.html',
  styleUrls: ['./home-routine-editor.component.scss']
})

export class HomeRoutineEditorComponent implements OnInit {

  flagClose = true;

  constructor(){}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
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
