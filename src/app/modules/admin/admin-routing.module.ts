import { NgModule } from '@angular/core';
import { AdminComponent } from './pages/admin/admin.component';
import { Routes, RouterModule } from '@angular/router';
import { PathGuard } from 'src/app/guards/path.guard';



const routes: Routes = [
  { path: '', 
  component: AdminComponent,
    title: 'Gimnasio | Admin',  
  canActivate: [PathGuard],data: { expectedRol: ['admin'] } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
