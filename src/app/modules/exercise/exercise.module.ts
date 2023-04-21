import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseComponent } from './pages/exercise/exercise.component';
import { ExerciseRoutingModule } from './exercise-routing.module';
import { SharedGlobalModule } from 'src/app/shared/global/shared-global.module';
import { ListExercisesComponent } from './components/list-exercises/list-exercises.component';
import { FormExerciseModule } from './components/form-exercises/form-exercise.module';



@NgModule({
  declarations: [
    ExerciseComponent,
    ListExercisesComponent
  ],
  imports: [
    CommonModule, ExerciseRoutingModule, SharedGlobalModule, FormExerciseModule
  ]
})
export class ExerciseModule { }
