import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './page/profile/profile.component';
import { PathGuard } from 'src/app/guards/path.guard';


const routes: Routes = [
  { 
  path: '', component: ProfileComponent, 
   title: 'Gimnasio | Perfil', 
   canActivate: [PathGuard],
   data: { expectedRol: ['admin', 'user'] } },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ProfileRoutingModule { }
