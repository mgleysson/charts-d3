import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { LineChartComponent } from './initial-charts/line-chart/line-chart.component';
import { LineChart2Component } from './initial-charts/line-chart-2/line-chart-2.component';
import { LineChartTest3Component } from './initial-charts/line-chart-test3/line-chart-test3.component';
import { LineChartTest4Component } from './initial-charts/line-chart-test4/line-chart-test4.component';
import {LineChartModule} from './line-chart/line-chart.module';

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    LineChart2Component,
    LineChartTest3Component,
    LineChartTest4Component
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        LineChartModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
