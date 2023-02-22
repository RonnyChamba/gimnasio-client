import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAuthComponent } from './pages/login-auth/login-auth.component';

const routes: Routes = [
  { path: '', component: LoginAuthComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
 }
