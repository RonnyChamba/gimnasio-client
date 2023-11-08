import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PathGuard } from 'src/app/guards/path.guard';
import { NAME_PATH_ADMIN, NAME_PATH_ASISTENCIA, NAME_PATH_CLIENTES, NAME_PATH_DIARIOS, NAME_PATH_GASTOS, NAME_PATH_INSCRIPCION, NAME_PATH_PERFIL, NAME_PATH_REPORTE } from 'src/app/utils/constants-url-path';

const routes: Routes = [
  {
    path: NAME_PATH_ADMIN,
    loadChildren: () =>
      import('../admin/admin.module').then((cp) => cp.AdminModule),
  },
  {
    path: NAME_PATH_CLIENTES,
    loadChildren: () =>
      import('../customer/customer.module').then((cp) => cp.CustomerModule),
  },
  {
    path: NAME_PATH_DIARIOS,
    loadChildren: () =>
      import('../daily/daily.module').then((cp) => cp.DailyModule),
  },
  {
    path: NAME_PATH_INSCRIPCION,
    loadChildren: () =>
      import('../inscription/inscription.module').then((cp) => cp.InscriptionModule),
  },
  {
    path: NAME_PATH_GASTOS,
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
    path: NAME_PATH_REPORTE,
    loadChildren: () =>
      import('../report/report.module').then((cp) => cp.ReportModule),
  },
  {
    path: NAME_PATH_ASISTENCIA,
    loadChildren: () =>
      import('../attendance/attendance.module').then((cp) => cp.AttendanceModule),
  },
  {
    path: NAME_PATH_PERFIL,
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
