import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './pages/report/report.component';
import { PathGuard } from 'src/app/guards/path.guard';


const routes: Routes = [
  { path: '', component: ReportComponent,  
  title: 'Gimnasio | Reportes', 
  canActivate: [PathGuard],
  data: { expectedRol: ['admin', 'user'] } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
