import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathGuard } from 'src/app/guards/path.guard';
import { CustomerEditorComponent } from '../customer/pages/customer-editor/customer-editor.component';



const routes: Routes = [
{ 
    path: ':ideCustomer', component: CustomerEditorComponent,
   title: 'Gimnasio | Clientes', 
   canActivate: [PathGuard],
   data: { expectedRol: ['admin', 'user', 'cliente'] } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerDatosClientesRoutingModule { }
