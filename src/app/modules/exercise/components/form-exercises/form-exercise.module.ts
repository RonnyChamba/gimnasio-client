import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormExercisesComponent } from './form-exercises.component';

@NgModule({
  declarations: [FormExercisesComponent],
  imports: [
    CommonModule, ReactiveFormsModule,
  ]
})
export class FormExerciseModule { }
