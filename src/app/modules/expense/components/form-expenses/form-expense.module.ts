import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormExpensesComponent } from './form-expenses.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [FormExpensesComponent],
  imports: [
    CommonModule, ReactiveFormsModule
  ]
})
export class FormExpenseModule { }
