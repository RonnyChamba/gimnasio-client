import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarDosComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { DirectAccessComponent } from './components/direct-access/direct-access.component';
import { CalcIndexListPipe, TrimDateToMonthPipe, TrimNameRolPipe, TrimNameUserPipe } from '../pipes/format-data.pipe';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { FilterAttendanceComponent } from './components/filter-attendance/filter-attendance.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [NavBarDosComponent, SideBarComponent, DirectAccessComponent,
     CalcIndexListPipe, TrimNameUserPipe, TrimNameRolPipe, PaginatorComponent, TrimDateToMonthPipe, FilterAttendanceComponent, LoaderComponent ],
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule
  ],
  exports: [NavBarDosComponent, SideBarComponent, DirectAccessComponent, 
    CalcIndexListPipe, TrimNameUserPipe, TrimNameRolPipe, PaginatorComponent,TrimDateToMonthPipe, FilterAttendanceComponent, LoaderComponent]
})
export class SharedGlobalModule { }
