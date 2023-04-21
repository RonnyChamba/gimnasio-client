import { NgModule } from '@angular/core';
import { DailyComponent } from './pages/daily/daily.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: DailyComponent,  title: 'Gimnasio | Diarios'  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class DailyRoutingModule { }
