import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceComponent } from './page/attendance/attendance.component';
import { SharedGlobalModule } from 'src/app/shared/global/shared-global.module';
import { AttendanceRoutingModule } from './attendance-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListAttendanceModule } from './components/list-attendance/list-attendance.module';



@NgModule({
  declarations: [
    AttendanceComponent,
  ],
  imports: [
    CommonModule, AttendanceRoutingModule, 
    SharedGlobalModule, ReactiveFormsModule, ListAttendanceModule
  ]
})
export class AttendanceModule { }
