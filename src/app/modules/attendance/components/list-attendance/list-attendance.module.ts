import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAttendanceComponent } from './list-attendance.component';
import { SharedGlobalModule } from 'src/app/shared/global/shared-global.module';



@NgModule({
  declarations: [ListAttendanceComponent],
  imports: [
    CommonModule, SharedGlobalModule
  ],
  exports: [ListAttendanceComponent]
})
export class ListAttendanceModule { }
