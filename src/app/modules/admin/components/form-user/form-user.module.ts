import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormUserComponent } from './form-user.component';

@NgModule({
  declarations: [FormUserComponent],
  imports: [CommonModule , ReactiveFormsModule],
  exports: [FormUserComponent]

})
export class FormUserModule { }