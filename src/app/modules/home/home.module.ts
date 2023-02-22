import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedGlobalModule } from 'src/app/shared/global/shared-global.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule, HomeRoutingModule, SharedGlobalModule, 
  ]
})
export class HomeModule { }
