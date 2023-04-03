import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { GenerateIndexPagePipe } from './shared/pipes/format-data.pipe'; 

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule,

    BrowserAnimationsModule, HttpClientModule
  
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
