import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLoginComponent } from './components/auth/form-login/form-login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HomeUserComponent } from './components/pages/home-user/home-user.component';
import { HomeCustomerComponent } from './components/pages/home-customer/home-customer.component';
import { HomeExerciseComponent } from './components/pages/home-exercise/home-exercise.component';
import { FormExerciseComponent } from './components/forms/form-exercise/form-exercise.component';


const routes: Routes = [
  { path: '', pathMatch: 'full',redirectTo:'login' },
  { path: 'login', component: FormLoginComponent },
  { path: 'home', component:  HomeComponent },
  { path: 'user', component: HomeUserComponent },
  { path: 'customer', component: HomeCustomerComponent },
  { path: 'exercise', component: HomeExerciseComponent },
  { path: 'form-exercise', component: FormExerciseComponent },
  // { path: 'list-exercise', component:  ListExerciseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
