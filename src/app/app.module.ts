import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts' ;

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FridgeComponent } from './fridge/fridge.component';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FridgeComponent
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ChartModule,
    RouterModule.forRoot([
      {path:'fridge',component:FridgeComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
