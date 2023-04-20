import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './page/attendance/attendance.component';

const routes: Routes = [
  { path: '',component: AttendanceComponent, title: 'Gimnasio | Asistencia'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
