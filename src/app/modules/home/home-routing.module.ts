import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'customer',
    loadChildren: () =>
      import('../customer/customer.module').then((cp) => cp.CustomerModule),
  },
  {
    path: 'daily',
    loadChildren: () =>
      import('../daily/daily.module').then((cp) => cp.DailyModule),
  },
  {
    path: 'expense',
    loadChildren: () =>
      import('../expense/expense.module').then((cp) => cp.ExpenseModule),
  },
  {
    path: 'category',
    loadChildren: () =>
      import('../category/category.module').then((cp) => cp.CategoryModule),
  },
  {
    path: 'exercise',
    loadChildren: () =>
      import('../exercise/exercise.module').then((cp) => cp.ExerciseModule),
  },
  {
    path: 'routine',
    loadChildren: () =>
      import('../routine/routine.module').then((cp) => cp.RoutineModule),
  },

  {
    path: 'admin',
    loadChildren: () =>
      import('../admin/admin.module').then((cp) => cp.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
