import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLoginComponent } from './components/auth/form-login/form-login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HomeUserComponent } from './components/pages/home-user/home-user.component';
import { HomeCustomerComponent } from './components/pages/home-customer/home-customer.component';
import { HomeExerciseComponent } from './components/pages/home-exercise/home-exercise.component';
import { HomeRoutineComponent } from './components/pages/home-routine/home-routine.component';
import { HomeRoutineEditorComponent } from './components/pages/home-routine-editor/home-routine-editor.component';
import { HomeCategoryComponent } from './components/pages/home-category/home-category.component';
import { HomeExpenseComponent } from './components/pages/home-expense/home-expense.component';
import { HomeDailyComponent } from './components/pages/home-daily/home-daily.component';
import { HomeCustomerEditorComponent } from './components/pages/home-customer-editor/home-customer-editor.component';


const routes: Routes = [
  { path: '', pathMatch: 'full',redirectTo:'login' },
  { path: 'login', component: FormLoginComponent },
  { path: 'home', component:  HomeComponent },
  { path: 'user', component: HomeUserComponent },
  { path: 'customer', component: HomeCustomerComponent },
  { path: 'exercise', component: HomeExerciseComponent },
  { path: 'routine', component: HomeRoutineComponent },
  { path: 'routine/editor', component: HomeRoutineEditorComponent },
  { path: 'category', component: HomeCategoryComponent },
  { path: 'daily', component: HomeDailyComponent },
  { path: 'expense', component: HomeExpenseComponent },
  { path: 'customer/:ideCustomer', component: HomeCustomerEditorComponent },

  // { path: 'form-exercise', component: FormExerciseComponent },
  // { path: 'list-exercise', component:  ListExerciseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
