import { NgModule } from '@angular/core';
import { DailyComponent } from './pages/daily/daily.component';
import { RouterModule, Routes } from '@angular/router';
import { PathGuard } from 'src/app/guards/path.guard';

const routes: Routes = [
  { path: '', component: DailyComponent,  
  title: 'Gimnasio | Diarios', 
  canActivate: [PathGuard],
  data: { expectedRol: ['admin', 'user'] } },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class DailyRoutingModule { }
