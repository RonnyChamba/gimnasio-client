import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginAuthComponent } from './pages/login-auth/login-auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { interceptorProvider } from './interceptor/general.interceptor';

@NgModule({
  declarations: [LoginAuthComponent],
  imports: [
    CommonModule, ReactiveFormsModule, AuthRoutingModule
  ],
  providers: [interceptorProvider]
})
export class AuthModule { }