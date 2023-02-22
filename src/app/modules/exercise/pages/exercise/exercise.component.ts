import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormExercisesComponent } from '../../components/form-exercises/form-exercises.component';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent  implements OnInit{
 
  flagClose = true;

  constructor(private modalService: NgbModal){}
  ngOnInit(): void {
   

  }

  onClickMenu(value: boolean){  

    this.flagClose = value;
  }
  openModal(){

    // console.log("Abrir modal");

    this.modalService.open(FormExercisesComponent, {
      size: "lg"
    });
  }

}