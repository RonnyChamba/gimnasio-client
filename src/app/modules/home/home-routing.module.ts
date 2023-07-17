import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PathGuard } from 'src/app/guards/path.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('../admin/admin.module').then((cp) => cp.AdminModule),
  },
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
    path: 'inscription',
    loadChildren: () =>
      import('../inscription/inscription.module').then((cp) => cp.InscriptionModule),
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
    path: 'report',
    loadChildren: () =>
      import('../report/report.module').then((cp) => cp.ReportModule),
  },
  {
    path: 'attendance',
    loadChildren: () =>
      import('../attendance/attendance.module').then((cp) => cp.AttendanceModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('../profile/profile.module').then((cp) => cp.ProfileModule),
  },
  { path: '', component: HomeComponent,  
  title: 'Gimnasio | Home',
  canActivate: [PathGuard],
  data: { expectedRol: ['admin', 'user'] } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
