import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCustomersComponent } from './form-customers.component';
import {  ReactiveFormsModule } from '@angular/forms';

/**
 * Este module es solo para el form-customer, este componente se lo  llamara dese page customer y
 * desde otro componente fuera de page customer, por ello tiene su propio ngModule
 */

@NgModule({
  declarations: [FormCustomersComponent],
  imports: [
    CommonModule,  ReactiveFormsModule
  ]
})
export class FormCustomersModule { }
