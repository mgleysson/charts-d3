import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PointComponent} from './point/point.component';
import {SegmentComponent} from './segment/segment.component';
import {LineChartComponent} from './line-chart-config/line-chart.component';
import {DraggablePointDirective} from './draggable-point.directive';
import {ContribNgNoHostModule} from '@angular-contrib/common';
import {BehaviorModule} from '../behavior/behavior.module';
import {AxisBottomComponent} from './axis/axis-bottom.component';
import {AxisLeftComponent} from './axis/axis-left.component';


@NgModule({
    declarations: [
        PointComponent,
        SegmentComponent,
        LineChartComponent,
        DraggablePointDirective,
        AxisBottomComponent,
        AxisLeftComponent
    ],
    exports: [
        LineChartComponent
    ],
    imports: [
        CommonModule,
        ContribNgNoHostModule,
        BehaviorModule
    ]
})
export class LineChartModule {
}
