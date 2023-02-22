import { NgModule } from '@angular/core';
import { RoutineComponent } from './pages/routine/routine.component';
import { Routes, RouterModule } from '@angular/router';
import { RoutineEditorComponent } from './pages/routine-editor/routine-editor.component';



const routes: Routes = [
  { path: '', component: RoutineComponent },
  { path: 'editor', component: RoutineEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutineRoutingModule { }
