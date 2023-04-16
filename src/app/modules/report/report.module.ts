import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedGlobalModule } from 'src/app/shared/global/shared-global.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './pages/report/report.component';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  declarations: [
  
    ReportComponent,
       FilterComponent
  ],
  imports: [
    CommonModule, ReportRoutingModule, SharedGlobalModule, ReactiveFormsModule
  ]
})
export class ReportModule { }