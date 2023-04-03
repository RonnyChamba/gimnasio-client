import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { ListCustomersComponent } from './components/list-customers/list-customers.component';
import { SharedGlobalModule } from 'src/app/shared/global/shared-global.module';
import { FormCustomersModule } from './components/form-customers/form-customers.module';
import { CustomerEditorComponent } from './pages/customer-editor/customer-editor.component';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { InfoCustomerComponent } from './components/info-customer/info-customer.component';
import { DataCustomerComponent } from './components/data-customer/data-customer.component';
import { DailyCustomerComponent } from './components/daily-customer/daily-customer.component';
import { InvoiceCustomerComponent } from './components/invoice-customer/invoice-customer.component';
import { FormUpdateCustomerComponent } from './components/form-update-customer/form-update-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomerComponent, 
    ListCustomersComponent, 
    CustomerEditorComponent, 
    CustomerProfileComponent, 
    InfoCustomerComponent, 
    DataCustomerComponent, 
    DailyCustomerComponent, 
    InvoiceCustomerComponent, 
    FormUpdateCustomerComponent],
  imports: [
    CommonModule, CustomerRoutingModule,   FormsModule, SharedGlobalModule, FormCustomersModule,  ReactiveFormsModule
  ],
})
export class CustomerModule { }
