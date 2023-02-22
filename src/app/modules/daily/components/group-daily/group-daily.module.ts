import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupDailyComponent } from './group-daily.component';
import { FormDailiesComponent } from '../form-dailies/form-dailies.component';
import { FormDailiesCustomersComponent } from '../form-dailies-customers/form-dailies-customers.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [GroupDailyComponent, FormDailiesComponent, FormDailiesCustomersComponent],
  imports: [
    CommonModule, ReactiveFormsModule
  ]
})
export class GroupDailyModule { }
