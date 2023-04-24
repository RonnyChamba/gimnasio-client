import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedGlobalModule } from 'src/app/shared/global/shared-global.module';
import { FormUserComponent } from './components/form-user/form-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupPanelComponent } from './components/group-panel/group-panel.component';
import { ListModalityComponent } from './components/list-modality/list-modality.component';
import { FormModalityComponent } from './components/form-modality/form-modality.component';
import { FormUserModule } from './components/form-user/form-user.module';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    AdminComponent,
    ListUsersComponent,
    GroupPanelComponent,
    ListModalityComponent,
    FormModalityComponent
  ],
  imports: [
    CommonModule , AdminRoutingModule, ReactiveFormsModule,  SharedGlobalModule, FormUserModule, TableModule
  ],
  exports: []

})
export class AdminModule { }
