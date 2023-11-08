import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedGlobalModule } from 'src/app/shared/global/shared-global.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VerDatosClientesRoutingModule } from './ver-datos-clientes-routing.module';



@NgModule({
  declarations: [
    // RoutineComponent,
    // ListRoutinesComponent,
    // RoutineEditorComponent,
    // FormRoutinesComponent
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    VerDatosClientesRoutingModule,
    SharedGlobalModule
  ]
})
export class VerDatosClientesModule { }
