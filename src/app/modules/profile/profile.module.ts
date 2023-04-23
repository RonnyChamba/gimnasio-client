import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedGlobalModule } from 'src/app/shared/global/shared-global.module';
import { ProfileComponent } from './page/profile/profile.component';
import { ProfileInformationComponent } from './components/profile-information/profile-information.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataCountComponent } from './components/data-count/data-count.component';



@NgModule({
  declarations: [
    ProfileComponent,
    ProfileInformationComponent,
    DataCountComponent
  ],
  imports: [
    CommonModule, ProfileRoutingModule, SharedGlobalModule, ReactiveFormsModule
  ]
})
export class ProfileModule { }
