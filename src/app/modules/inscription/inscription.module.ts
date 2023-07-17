import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionRoutingModule } from './inscription-routing.module';
import { SharedGlobalModule } from 'src/app/shared/global/shared-global.module';
import { InscriptionComponent } from './page/inscription/inscription.component';
import { InscriptionTableModule } from './components/list-inscription/inscription-table.module';

@NgModule({
  declarations: [
    InscriptionComponent
  ],
  imports: [
    CommonModule, InscriptionRoutingModule, SharedGlobalModule,InscriptionTableModule
  ]
})
export class InscriptionModule { }
