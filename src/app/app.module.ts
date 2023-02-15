import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NabSideBarComponent } from './components/auth/nab-side-bar/nab-side-bar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HomeUserComponent } from './components/pages/home-user/home-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormLoginComponent } from './components/auth/form-login/form-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeCustomerComponent } from './components/pages/home-customer/home-customer.component';
import { FormCustomerComponent } from './components/forms/form-customer/form-customer.component';
import { FormUserComponent } from './components/forms/form-user/form-user.component';
import { ListCustomerComponent } from './components/list/list-customer/list-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    NabSideBarComponent,
    HomeComponent,
    HomeUserComponent,
    FormLoginComponent,
    HomeCustomerComponent,
    FormCustomerComponent,
    FormUserComponent,
    ListCustomerComponent
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule,
    BrowserAnimationsModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
