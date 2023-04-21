import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarDosComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { DirectAccessComponent } from './components/direct-access/direct-access.component';
import { CalcIndexListPipe, TrimNameRolPipe, TrimNameUserPipe } from '../pipes/format-data.pipe';

@NgModule({
  declarations: [NavBarDosComponent, SideBarComponent, DirectAccessComponent,
     CalcIndexListPipe, TrimNameUserPipe, TrimNameRolPipe ],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [NavBarDosComponent, SideBarComponent, DirectAccessComponent, 
    CalcIndexListPipe, TrimNameUserPipe, TrimNameRolPipe]
})
export class SharedGlobalModule { }
