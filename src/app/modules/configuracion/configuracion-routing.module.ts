import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathGuard } from 'src/app/guards/path.guard';
import { ConfigurationComponent } from './page/configuration/configuration.component';



const routes: Routes = [
  { path: '', 
  component: ConfigurationComponent,
    title: 'Gimnasio | Configuración',  
  // canActivate: [PathGuard],data: { expectedRol: ['admin'] } 

},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
