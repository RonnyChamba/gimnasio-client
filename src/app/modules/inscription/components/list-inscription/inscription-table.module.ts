import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListInscriptionComponent } from './list-inscription.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedGlobalModule } from 'src/app/shared/global/shared-global.module';


/**
 * Maneja un modulo independiente para la tabla de inscripciones, esta se llama desde el modulo de inscripciones
 * y desde el modulo de clientes
 */
@NgModule({
  declarations: [
    ListInscriptionComponent],
  imports: [
    CommonModule, ReactiveFormsModule, SharedGlobalModule
  ]
  , exports: [ListInscriptionComponent]
})
export class InscriptionTableModule { }
