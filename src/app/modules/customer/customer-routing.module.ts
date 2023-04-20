import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerEditorComponent } from './pages/customer-editor/customer-editor.component';
import { CustomerComponent } from './pages/customer/customer.component';

const routes: Routes = [
  { path: '', component: CustomerComponent,  title: 'Gimnasio | Clientes'  },

  { path: ':ideCustomer', component: CustomerEditorComponent, title: 'Gimnasio | Clientes' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
