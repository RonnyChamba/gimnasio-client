import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedGlobalModule } from 'src/app/shared/global/shared-global.module';
import { FormUserComponent } from './components/form-user/form-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { ModalityService } from './services/modality.service';


@NgModule({
  declarations: [
    AdminComponent,
    FormUserComponent,
    ListUsersComponent
  ],
  imports: [
    CommonModule , AdminRoutingModule, ReactiveFormsModule,  SharedGlobalModule
  ]
})
export class AdminModule { }
