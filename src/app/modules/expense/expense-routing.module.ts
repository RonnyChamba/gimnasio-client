import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseComponent } from './pages/expense/expense.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ExpenseComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ExpenseRoutingModule { }
