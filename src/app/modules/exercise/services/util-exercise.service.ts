import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ExerciseAttributes } from 'src/app/core/models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class UtilExerciseService  implements OnInit {


  private  subjectExercise = new Subject<ExerciseAttributes>();

  constructor() { }

  ngOnInit() {
  }

  get  refreshExercises() {
    return   this.subjectExercise;
  }

  refreshExerciseAsObservable() {
    return this.subjectExercise.asObservable();
  }
}
