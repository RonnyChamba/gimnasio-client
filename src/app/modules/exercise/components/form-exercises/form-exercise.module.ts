import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormExercisesComponent } from './form-exercises.component';
// import { FileUploadModule } from 'primeng/fileupload';
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [FormExercisesComponent],
  imports: [
    CommonModule, ReactiveFormsModule, MultiSelectModule
  ]
})
export class FormExerciseModule { }
