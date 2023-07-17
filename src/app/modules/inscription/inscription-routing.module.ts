import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InscriptionComponent } from './page/inscription/inscription.component';
import { PathGuard } from 'src/app/guards/path.guard';

const routes: Routes = [
  { path: '', component: InscriptionComponent,  
  title: 'Gimnasio | Membresías', 
  canActivate: [PathGuard],
  data: { expectedRol: ['admin', 'user'] } },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscriptionRoutingModule { }
