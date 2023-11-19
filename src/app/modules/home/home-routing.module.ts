import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PathGuard } from 'src/app/guards/path.guard';
import { NAME_PATH_ADMIN, NAME_PATH_ASISTENCIA, NAME_PATH_CLIENTES, NAME_PATH_CONFIGURACION, NAME_PATH_DIARIOS, NAME_PATH_GASTOS, NAME_PATH_INSCRIPCION, NAME_PATH_PERFIL, NAME_PATH_REPORTE } from 'src/app/utils/constants-url-path';
import { MENU_ADMIN, MENU_ASISTENCIA, MENU_CLIENTE, MENU_CONFIGURACION, MENU_DIARIO, MENU_GASTO, MENU_HOME, MENU_INSCRIPCION, MENU_PERFIL, MENU_REPORTE } from 'src/app/utils/constants-menu';
import { roleGuard } from 'src/app/guards/role.guard';

const routes: Routes = [
  {
    path: NAME_PATH_ADMIN,
    data: { menuId: MENU_ADMIN},
    canActivateChild: [roleGuard],
    loadChildren: () =>
      import('../admin/admin.module').then((cp) => cp.AdminModule),
  },
  {
    path: NAME_PATH_CLIENTES,
    data: { menuId: MENU_CLIENTE},
    canActivateChild: [roleGuard],
    loadChildren: () =>
      import('../customer/customer.module').then((cp) => cp.CustomerModule),
  },
  {
    path: NAME_PATH_DIARIOS,
    data: { menuId: MENU_DIARIO},
    canActivateChild: [roleGuard],
    loadChildren: () =>
      import('../daily/daily.module').then((cp) => cp.DailyModule),
  },
  {
    path: NAME_PATH_CONFIGURACION,
    data: { menuId: MENU_CONFIGURACION},
    // canActivateChild: [roleGuard],
    loadChildren: () =>
      import('../configuracion/confiiguracion.module').then((cp) => cp.ConfiguracionModule),
  },
  {
    path: NAME_PATH_INSCRIPCION,
    data: { menuId: MENU_INSCRIPCION},
    canActivateChild: [roleGuard],
    loadChildren: () =>
      import('../inscription/inscription.module').then((cp) => cp.InscriptionModule),
  },
  {
    path: NAME_PATH_GASTOS,
    data: { menuId: MENU_GASTO},
    canActivateChild: [roleGuard],
    loadChildren: () =>
      import('../expense/expense.module').then((cp) => cp.ExpenseModule),
  },
  {
    path: 'category',
    canActivateChild: [roleGuard],
    loadChildren: () =>
      import('../category/category.module').then((cp) => cp.CategoryModule),
  },
  {
    path: 'exercise',
    canActivateChild: [roleGuard],
    loadChildren: () =>
      import('../exercise/exercise.module').then((cp) => cp.ExerciseModule),
  },
  {
    path: 'routine',
    canActivateChild: [roleGuard],
    loadChildren: () =>
      import('../routine/routine.module').then((cp) => cp.RoutineModule),
  },
  {
    path: NAME_PATH_REPORTE,
    data: { menuId: MENU_REPORTE},
    canActivateChild: [roleGuard],
    loadChildren: () =>
      import('../report/report.module').then((cp) => cp.ReportModule),
  },
  {
    path: NAME_PATH_ASISTENCIA,
    data: { menuId: MENU_ASISTENCIA},
    canActivateChild: [roleGuard],
    loadChildren: () =>
      import('../attendance/attendance.module').then((cp) => cp.AttendanceModule),
  },
  {
    path: NAME_PATH_PERFIL,
    canActivateChild: [roleGuard],
    data: { menuId: MENU_PERFIL},
    loadChildren: () =>
      import('../profile/profile.module').then((cp) => cp.ProfileModule),
  },
  { path: '', component: HomeComponent,  
  title: 'Gimnasio | Home',
  canActivate: [PathGuard],
  data: { expectedRol: ['admin', 'user'],
          menuId: MENU_HOME } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
