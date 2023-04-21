import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InscriptionComponent } from './page/inscription/inscription.component';

const routes: Routes = [
  { path: '', component: InscriptionComponent,  title: 'Gimnasio | Inscripciones'  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscriptionRoutingModule { }
