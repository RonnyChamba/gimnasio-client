import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyComponent } from './pages/daily/daily.component';
import { DailyRoutingModule } from './daily-routing.module';
import { SharedGlobalModule } from 'src/app/shared/global/shared-global.module';
import { ListDailiesComponent } from './components/list-dailies/list-dailies.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormDailiesComponent } from './components/form-dailies/form-dailies.component';

@NgModule({
  declarations: [DailyComponent, ListDailiesComponent, FormDailiesComponent],
  imports: [
    CommonModule, DailyRoutingModule, SharedGlobalModule, ReactiveFormsModule
  ]
})
export class DailyModule { }
