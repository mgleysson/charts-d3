import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Segment } from '../models/segment';
import { Point } from '../models/pointCoord';
import { LineChart } from './line-chart';


@Component({
    selector: 'edg-line-chart',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <svg #svg [attr.width]="_options.width" [attr.height]="_options.height">
            <edg-axis-left [svg]="svg"></edg-axis-left>
            <edg-axis-bottom [svg]="svg"></edg-axis-bottom>
            <g [edgZoomableOf]="svg">
                <edg-segment *ngFor="let segment of segments" class="segment" [segment]="segment"></edg-segment>
                <g *ngFor="let point of points" [edgDraggablePoint]="point" [draggableInLineChart]="lineChart">
                    <edg-point [point]="point" [options]="{r: 10}"/>
                </g>
            </g>
        </svg>
    `
})
export class LineChartComponent implements OnInit, AfterViewInit {

    @Input() points: Point[] = [];
    @Input() segments: Segment[] = [];

    lineChart: LineChart;

    private options: { width, height } = { width: 800, height: 600 };

    constructor(private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit(): void {

        // this.simpleAxes();

        for (let i = 1; i <= 5; i++) {
            this.points.push(new Point(i.toString()));
        }

        for (const a of this.points) {
            for (const b of this.points) {
                if (a !== b) {
                    this.segments.push(new Segment(a, b));
                }
            }
        }

        this.lineChart = new LineChart(this.points, this.segments, this._options);

        this.lineChart.ticker.subscribe(() => {
            this.changeDetectorRef.markForCheck();
        });
    }

    ngAfterViewInit(): void {
        this.lineChart.initSimulation(this._options);
    }

    get _options(): { width, height } {
        return this.options = {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    // simpleAxes() {
    //     let element = this.chartContainer.nativeElement;
    //     let width:number = 300;
    //     let height:number = 300;
    //     let yPad:number = 50;
    //     let xPad:number = 50;
    //     let xTicks:number = 10;
    //     let yTicks:number = 10;
    //
    //     let xValues = [75, 250, 350, 120, 600, 450, 125, 850];
    //     let yValues = [25, 150, 250, 320, 400, 550, 325, 815];
    //
    //     // Step 1: create an svg element
    //     let svg:any = d3.select(element)
    //         .append("svg")
    //         .attr("width", width)
    //         .attr("height", height);
    //
    //     // Step 2: define the x and y scales
    //     let xScale = d3.scaleLinear()
    //         .domain([0, d3.max(xValues)])
    //         .range([xPad, width - xPad]);
    //
    //     let yScale = d3.scaleLinear()
    //         .domain([0, d3.max(yValues)])
    //         .range([height - yPad, yPad]);
    //
    //     // Step 3: define the x and y axes
    //     let xAxis = d3.axisBottom(xScale)
    //         .ticks(xTicks);
    //
    //     let yAxis = d3.axisLeft(yScale)
    //         .ticks(yTicks);
    //
    //     // Step 4: render the axes
    //     svg.append("g")
    //         .attr("class", "xaxis")
    //         .attr("transform", "translate(0, " + (height-yPad) + ")")
    //         .call(xAxis);
    //
    //     svg.append("g")
    //         .attr("class", "yaxis")
    //         .attr("transform", "translate(" + xPad + ",0)")
    //         .call(yAxis)
    // }

}
