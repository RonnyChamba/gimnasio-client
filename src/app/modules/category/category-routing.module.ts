import { NgModule } from '@angular/core';
import { CategoryComponent } from './pages/category/category.component';
import { RouterModule, Routes } from '@angular/router';
import { PathGuard } from 'src/app/guards/path.guard';


const routes: Routes = [
  { path: '', component: CategoryComponent,  
  title: 'Gimnasio | Categorías',
  canActivate: [PathGuard],
  data: { expectedRol: ['admin', 'user'] } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
