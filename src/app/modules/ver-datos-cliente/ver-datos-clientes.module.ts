import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedGlobalModule } from 'src/app/shared/global/shared-global.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VerDatosClientesRoutingModule } from './ver-datos-clientes-routing.module';
import { VerDatosClientesComponent } from './pages/ver-datos-clientes/ver-datos-clientes.component';



@NgModule({
  declarations: [
    // RoutineComponent,
    // ListRoutinesComponent,
    // RoutineEditorComponent,
    // FormRoutinesComponent
  
    VerDatosClientesComponent
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    VerDatosClientesRoutingModule,
    SharedGlobalModule
  ]
})
export class VerDatosClientesModule { }
