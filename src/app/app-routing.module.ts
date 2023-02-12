import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLoginComponent } from './components/auth/form-login/form-login.component';
import { FormHomeComponent } from './components/pages/form-home/form-home.component';
import { FormUserComponent } from './components/pages/form-user/form-user.component';


const routes: Routes = [
  { path: '', pathMatch: 'full',redirectTo:'login' },
  { path: 'login', component: FormLoginComponent },
  { path: 'home', component:  FormHomeComponent },
  { path: 'user', component: FormUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
