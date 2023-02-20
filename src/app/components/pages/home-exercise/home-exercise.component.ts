import { Component, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormExerciseComponent } from '../../forms/form-exercise/form-exercise.component';

@Component({
  selector: 'app-home-exercise',
  templateUrl: './home-exercise.component.html',
  styleUrls: ['./home-exercise.component.scss']
})
export class HomeExerciseComponent  implements OnInit{
 
  flagClose = true;

  constructor(private modalService: NgbModal){}
  ngOnInit(): void {
   

  }

  onClickMenu(value: boolean){  

    this.flagClose = value;
  }
  openModal(){

    // console.log("Abrir modal");

    this.modalService.open(FormExerciseComponent, {
      size: "lg"
    });
  }

}
