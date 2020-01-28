import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { Point } from './models/pointCoord';
import { LineChart } from './line-chart-config/line-chart';
import { LineChartService } from './line-chart-config/line-chart.service';


@Directive({
    selector: '[edgDraggablePoint]'
})
export class DraggablePointDirective implements OnInit {

    @Input('edgDraggablePoint') draggablePoint: Point;

    @Input() draggableInLineChart: LineChart;


    constructor(private lineChartService: LineChartService, private elementRef: ElementRef) { }

    ngOnInit(): void {
        this.lineChartService.applyDraggableBehaviour(
            this.elementRef.nativeElement,
            this.draggablePoint,
            this.draggableInLineChart
        );
    }

}
