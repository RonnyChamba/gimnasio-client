import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NabSideBarComponent } from './components/auth/nab-side-bar/nab-side-bar.component';
import { FormHomeComponent } from './components/pages/form-home/form-home.component';
import { FormUserComponent } from './components/pages/form-user/form-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormLoginComponent } from './components/auth/form-login/form-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormCustomerComponent } from './components/pages/form-customer/form-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    NabSideBarComponent,
    FormHomeComponent,
    FormUserComponent,
    FormLoginComponent,
    FormCustomerComponent
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule,
    BrowserAnimationsModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
