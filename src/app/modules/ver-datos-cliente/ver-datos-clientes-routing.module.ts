import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathGuard } from 'src/app/guards/path.guard';



const routes: Routes = [
//   { path: '', component: RoutineComponent, 

//   canActivate: [PathGuard],data: { expectedRol: ['admin', 'user'] }

// },
//   { path: 'editor', component: RoutineEditorComponent

//   ,canActivate: [PathGuard],data: { expectedRol: ['admin', 'user'] } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerDatosClientesRoutingModule { }
