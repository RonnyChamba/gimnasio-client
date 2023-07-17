import { Component,OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormExercisesComponent } from '../../components/form-exercises/form-exercises.component';
import { TokenService } from 'src/app/modules/auth/service/token.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent  implements OnInit{
 
  flagClose = true;


  constructor(
    private modalService: NgbModal,
    private tokenService: TokenService
    ){

      this.flagClose = this.tokenService.getFlagClose();
    }

  ngOnInit(): void {
  }

  onClickMenu(value: boolean){  

    this.flagClose = value;
    this.tokenService.setFlagClose(this.flagClose);
  }
  openModal(){

    // console.log("Abrir modal");

    this.modalService.open(FormExercisesComponent, {
      size: "md",
      backdrop: 'static',
       keyboard: false
    });
  }


  

}