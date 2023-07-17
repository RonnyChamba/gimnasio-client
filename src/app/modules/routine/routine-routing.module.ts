import { NgModule } from '@angular/core';
import { RoutineComponent } from './pages/routine/routine.component';
import { Routes, RouterModule } from '@angular/router';
import { RoutineEditorComponent } from './pages/routine-editor/routine-editor.component';
import { PathGuard } from 'src/app/guards/path.guard';



const routes: Routes = [
  { path: '', component: RoutineComponent, 

  canActivate: [PathGuard],data: { expectedRol: ['admin', 'user'] }

},
  { path: 'editor', component: RoutineEditorComponent

  ,canActivate: [PathGuard],data: { expectedRol: ['admin', 'user'] } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutineRoutingModule { }
