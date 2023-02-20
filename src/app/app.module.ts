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
import { HomeExerciseComponent } from './components/pages/home-exercise/home-exercise.component';
import { ListExerciseComponent } from './components/list/list-exercise/list-exercise.component';
import { FormExerciseComponent } from './components/forms/form-exercise/form-exercise.component';
import { HomeRoutineComponent } from './components/pages/home-routine/home-routine.component';
import { ListRoutineComponent } from './components/list/list-routine/list-routine.component';
import { FormRoutineComponent } from './components/forms/form-routine/form-routine.component';
import { HomeRoutineEditorComponent } from './components/pages/home-routine-editor/home-routine-editor.component';
import { HomeCategoryComponent } from './components/pages/home-category/home-category.component';
import { ListCategoryComponent } from './components/list/list-category/list-category.component';
import { FormDailyComponent } from './components/forms/form-daily/form-daily.component';
import { HomeExpenseComponent } from './components/pages/home-expense/home-expense.component';
import { FormExpenseComponent } from './components/forms/form-expense/form-expense.component';
import { ListExpenseComponent } from './components/list/list-expense/list-expense.component';
import { AccesosDirectosComponent } from './components/util/accesos-directos/accesos-directos.component';
import { HomeDailyComponent } from './components/pages/home-daily/home-daily.component';
import { ListDailyComponent } from './components/list/list-daily/list-daily.component';
import { GroupDailyComponent } from './components/util/group-daily/group-daily.component';
import { FormDailyCustomerComponent } from './components/forms/form-daily-customer/form-daily-customer.component';
import { NavbarComponent } from './components/auth/navbar/navbar.component';

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
    ListCustomerComponent,
    HomeExerciseComponent,
    ListExerciseComponent,
    FormExerciseComponent,
    HomeRoutineComponent,
    ListRoutineComponent,
    FormRoutineComponent,
    HomeRoutineEditorComponent,
    HomeCategoryComponent,
    ListCategoryComponent,
    FormDailyComponent,
    HomeExpenseComponent,
    FormExpenseComponent,
    ListExpenseComponent,
    AccesosDirectosComponent,
    HomeDailyComponent,
    ListDailyComponent,
    GroupDailyComponent,
    FormDailyCustomerComponent,
    NavbarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule,
    BrowserAnimationsModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
