import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerEditorComponent } from './pages/customer-editor/customer-editor.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { PathGuard } from 'src/app/guards/path.guard';

const routes: Routes = [
  { path: '', component: CustomerComponent,  
   title: 'Gimnasio | Clientes',
   canActivate: [PathGuard],
   data: { expectedRol: ['admin', 'user'] } },

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
export class CustomerRoutingModule { }
