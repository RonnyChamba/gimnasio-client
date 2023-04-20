import { NgModule } from '@angular/core';
import { ExpenseComponent } from './pages/expense/expense.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ExpenseComponent,  title: 'Gimnasio | Gastos'  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ExpenseRoutingModule { }
