import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NAME_PATH_AUTH, NAME_PATH_BASE, URL_BASE } from './utils/constants-url-path';
const routes: Routes = [
 
  { path: NAME_PATH_BASE,
   loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: NAME_PATH_AUTH,
   loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
   {
    path: '**',
    redirectTo: URL_BASE,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
