import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryRoutingModule } from './category-routing.module';
import { SharedGlobalModule } from 'src/app/shared/global/shared-global.module';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { FormCategoryComponent } from './components/form-category/form-category.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CategoryComponent,
    ListCategoriesComponent,
    FormCategoryComponent
  ],
  imports: [
    CommonModule, CategoryRoutingModule, SharedGlobalModule, ReactiveFormsModule
  ]
})
export class CategoryModule { }
