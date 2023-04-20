import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './pages/category/category.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: CategoryComponent,  title: 'Gimnasio | Categorias'  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
