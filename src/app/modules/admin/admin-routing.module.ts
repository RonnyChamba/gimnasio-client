import { NgModule } from '@angular/core';
import { AdminComponent } from './pages/admin/admin.component';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: '', 
  component: AdminComponent,
    title: 'Gimnasio | Admin', },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
