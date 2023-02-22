import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyComponent } from './pages/daily/daily.component';
import { DailyRoutingModule } from './daily-routing.module';
import { SharedGlobalModule } from 'src/app/shared/global/shared-global.module';
import { ListDailiesComponent } from './components/list-dailies/list-dailies.component';
import { GroupDailyModule } from './components/group-daily/group-daily.module';

@NgModule({
  declarations: [DailyComponent, ListDailiesComponent],
  imports: [
    CommonModule, DailyRoutingModule, SharedGlobalModule, GroupDailyModule
  ]
})
export class DailyModule { }
