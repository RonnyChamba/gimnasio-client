import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutineComponent } from './pages/routine/routine.component';
import { RoutineRoutingModule } from './routine-routing.module';
import { SharedGlobalModule } from 'src/app/shared/global/shared-global.module';
import { ListRoutinesComponent } from './components/list-routines/list-routines.component';
import { RoutineEditorComponent } from './pages/routine-editor/routine-editor.component';
import { FormRoutinesComponent } from './components/form-routines/form-routines.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RoutineComponent,
    ListRoutinesComponent,
    RoutineEditorComponent,
    FormRoutinesComponent
  ],
  imports: [
    CommonModule,  ReactiveFormsModule,  RoutineRoutingModule, SharedGlobalModule
  ]
})
export class RoutineModule { }
