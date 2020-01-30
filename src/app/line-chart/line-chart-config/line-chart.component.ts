import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnInit} from '@angular/core';
import {Segment} from '../models/segment';
import {Point} from '../models/pointCoord';
import {LineChart} from './line-chart';
import * as d3 from 'd3';
import {range} from 'rxjs';


@Component({
    selector: 'edg-line-chart',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <svg #svg [attr.width]="_options.width" [attr.height]="_options.height">
            <g>
                <edg-axis-bottom [svg]="svg"></edg-axis-bottom>
            </g>
            <g>
                <edg-axis-left [svg]="svg"></edg-axis-left>
            </g>
            <g [edgZoomableOf]="svg">
                <!--                <edg-segment *ngFor="let segment of segments" class="segment" [segment]="segment"></edg-segment>-->
                <!--                <g *ngFor="let point of points" [edgDraggablePoint]="point" [draggableInLineChart]="lineChart">-->
                <!--                    <edg-point [point]="point" [options]="{r: 20}"/>-->
                <!--                </g>-->
            </g>
        </svg>
    `
})
export class LineChartComponent implements OnInit, AfterViewInit {

    @Input() points: Point[] = [];
    @Input() segments: Segment[] = [];

    lineChart: LineChart;

    svg: any;
    labelX: any;
    labelY: any;
    line: any;
    rect: any;

    private options: { width, height } = {width: 800, height: 600};

    constructor(private changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {

        // d3.select('body').style('background', 'gray');

        this.svg = d3.select('svg');

        this.svg.attr('transform', 'translate(50,50)');

        this.line = this.svg.append('g');
        this.rect = this.svg.append('g');

        this.initLine();
        this.initRects();

        // this.svg.style('background', 'lightgray');

        this.labelX = this.svg.append('g').append('text');
        this.labelY = this.svg.append('g').append('text');


        for (let i = 1; i <= 3; i++) {
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
        this.configChart();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
        this.configChart();
    }

    get _options(): { width, height } {
        const margin = {top: 70, right: 70, bottom: 70, left: 70};
        return this.options = {
            width: window.innerWidth - margin.left - margin.right,
            height: window.innerHeight - margin.top - margin.bottom
        };
    }

    configChart() {
        // text label for the x axis
        this.labelX.attr('transform',
            'translate(' + (this._options.width / 2) + ' ,' +
            (this._options.height - 5) + ')')
            .attr('text-anchor', 'end')
            .text('label-x');

        // text label for the y axis
        this.labelY.attr('transform', 'translate(15,' + (this._options.height / 2) + ') rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('label y');

        // // insert lines
        //     for (let i = 0; i < 9; i++) {
        //         this.line.append('line').attr('x1', 45)
        //             .attr('y1', 732 - 80 * i)
        //             .attr('x2', this._options.width)
        //             .attr('y2', 732 - 80 * i)
        //             .attr('stroke', 'gray');
        //     }
    }

    initLine() {
        //  insert line
        this.line.append('line').attr('x1', 250)
            .attr('y1', 28)
            .attr('x2', 750)
            .attr('y2', 28)
            .attr('stroke', 'black');

    }

    initRects() {

        for (let i = 0; i < 2; i++) {
            this.rect.append('rect')
                .attr('transform', 'translate(' + (300 + 400 * i) + ', 30)')
                .attr('width', 20)
                .attr('height', 150)
                .attr('fill', 'lightgray');
        }

        for (let i = 0; i < 2; i++) {
            this.rect.append('rect')
                .attr('transform', 'translate(' + (350 + 300 * i) + ', 250)')
                .attr('width', 20)
                .attr('height', 120)
                .attr('fill', 'lightgray');
        }

        for (let i = 0; i < 2; i++) {
            this.rect.append('rect')
                .attr('transform', 'translate(' + (350 + 300 * i) + ', 450)')
                .attr('width', 20)
                .attr('height', 80)
                .attr('fill', 'lightgray');
        }

        for (let i = 0; i < 2; i++) {
            this.rect.append('rect')
                .attr('transform', 'translate(' + (400 + 200 * i) + ', 550)')
                .attr('width', 20)
                .attr('height', 150)
                .attr('fill', 'lightgray');
        }

        for (let i = 0; i < 2; i++) {
            this.rect.append('rect')
                .attr('transform', 'translate(' + (420 + 160 * i) + ', 650)')
                .attr('width', 20)
                .attr('height', 150)
                .attr('fill', 'lightgray');
        }
    }

}
