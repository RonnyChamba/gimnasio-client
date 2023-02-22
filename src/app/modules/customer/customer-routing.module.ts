import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerEditorComponent } from './pages/customer-editor/customer-editor.component';
import { CustomerComponent } from './pages/customer/customer.component';

const routes: Routes = [
  { path: '', component: CustomerComponent },

  { path: ':ideCustomer', component: CustomerEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
