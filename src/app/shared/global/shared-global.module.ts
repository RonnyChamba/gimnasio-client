import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarDosComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { DirectAccessComponent } from './components/direct-access/direct-access.component';



@NgModule({
  declarations: [NavBarDosComponent, SideBarComponent, DirectAccessComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [NavBarDosComponent, SideBarComponent, DirectAccessComponent]
})
export class SharedGlobalModule { }
