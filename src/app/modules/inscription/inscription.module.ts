import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionRoutingModule } from './inscription-routing.module';
import { SharedGlobalModule } from 'src/app/shared/global/shared-global.module';
import { InscriptionComponent } from './page/inscription/inscription.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListInscriptionComponent } from './components/list-inscription/list-inscription.component';

@NgModule({
  declarations: [
    InscriptionComponent,
    ListInscriptionComponent
  ],
  imports: [
    CommonModule, InscriptionRoutingModule, SharedGlobalModule,ReactiveFormsModule
  ]
})
export class InscriptionModule { }
