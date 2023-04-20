import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ExerciseComponent } from './pages/exercise/exercise.component';


const routes: Routes = [
  { path: '', component: ExerciseComponent,  title: 'Gimnasio | Ejercicios'  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExerciseRoutingModule { }
