import { NgModule } from '@angular/core';
import { ExpenseComponent } from './pages/expense/expense.component';
import { RouterModule, Routes } from '@angular/router';
import { PathGuard } from 'src/app/guards/path.guard';

const routes: Routes = [
  { path: '', component: ExpenseComponent, 
   title: 'Gimnasio | Gastos', 
   canActivate: [PathGuard],
   data: { expectedRol: ['admin', 'user'] }  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ExpenseRoutingModule { }
