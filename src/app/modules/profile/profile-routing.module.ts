import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './page/profile/profile.component';


const routes: Routes = [
  { path: '', component: ProfileComponent,  title: 'Gimnasio | Perfil'  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ProfileRoutingModule { }
