import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { LineChartComponent } from './line-chart/line-chart.component';
import { LineChart2Component } from './line-chart-2/line-chart-2.component';

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    LineChart2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
