import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryRoutingModule } from './category-routing.module';
import { SharedGlobalModule } from 'src/app/shared/global/shared-global.module';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';



@NgModule({
  declarations: [
    CategoryComponent,
    ListCategoriesComponent
  ],
  imports: [
    CommonModule, CategoryRoutingModule, SharedGlobalModule
  ]
})
export class CategoryModule { }
