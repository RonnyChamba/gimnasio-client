import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from './page/configuration/configuration.component';
import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedGlobalModule } from 'src/app/shared/global/shared-global.module';
import { GroupPanelConfigComponent } from './components/group-panel-config/group-panel-config.component';
import { ListMenusComponent } from './components/list-menus/list-menus.component';
import { FormMenuComponent } from './components/form-menu/form-menu.component';
import { InformationCompanyComponent } from './components/information-company/information-company.component';

@NgModule({
  declarations: [
    ConfigurationComponent,
    GroupPanelConfigComponent,
    ListMenusComponent,
    FormMenuComponent,
    InformationCompanyComponent
  ],
  imports: [
    CommonModule , ConfiguracionRoutingModule, ReactiveFormsModule,  SharedGlobalModule
  ],
  exports: []

})
export class ConfiguracionModule { }0
