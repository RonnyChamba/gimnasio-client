import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NabSideBarComponent } from './components/auth/nab-side-bar/nab-side-bar.component';
import { FormHomeComponent } from './components/pages/form-home/form-home.component';
import { FormUserComponent } from './components/pages/form-user/form-user.component';

@NgModule({
  declarations: [
    AppComponent,
    
    NabSideBarComponent,
          FormHomeComponent,
          FormUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
