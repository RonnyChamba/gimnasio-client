import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseComponent } from './pages/expense/expense.component';
import { ExpenseRoutingModule } from './expense-routing.module';
import { SharedGlobalModule } from 'src/app/shared/global/shared-global.module';
import { ListExpensesComponent } from './components/list-expenses/list-expenses.component';
import { FormExpenseModule } from './components/form-expenses/form-expense.module';

@NgModule({
  declarations: [
    ExpenseComponent,
    ListExpensesComponent
  ],
  imports: [
    CommonModule, ExpenseRoutingModule, SharedGlobalModule, FormExpenseModule
  ]
})
export class ExpenseModule { }
