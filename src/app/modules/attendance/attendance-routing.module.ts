import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './page/attendance/attendance.component';
import { PathGuard } from 'src/app/guards/path.guard';

const routes: Routes = [
  { path: '',component: AttendanceComponent, title: 'Gimnasio | Asistencia',
  canActivate: [PathGuard],
  data: { expectedRol: ['admin','user'] }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
