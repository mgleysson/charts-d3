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
                <edg-axis-left [svg]="svg" [scaleY]="y"></edg-axis-left>
            </g>
            <g [edgZoomableOf]="svg">
                <!--                <edg-segment *ngFor="let segment of segments" class="segment" [segment]="segment"></edg-segment>-->
                <!--                <g *ngFor="let point of points" [edgDraggablePoint]="point" [draggableInLineChart]="lineChart">-->
                <!--                    <edg-point [point]="point" [options]="{r: 20}"/>-->
                <!--                </g>-->
                <line [attr.x1]="10" [attr.y1]="y(10)" [attr.x2]="400" [attr.y2]="y(400)" stroke="black" stroke-dasharray="3, 3" stroke-width="10"></line>
            </g>
        </svg>
    `
})
export class LineChartComponent implements OnInit, AfterViewInit {

    @Input() points: Point[] = [];
    @Input() segments: Segment[] = [];

    lineChart: LineChart;

    svg: any;
    chartView: any;
    labelX: any;
    labelY: any;
    line: any;
    rect: any;

    private options: { width, height } = {width: 800, height: 600};
    private rectProf: any;
    private verticalLines: any;
    private dashedLines: any;
    private triangles: any;

    y = d3.scaleLinear();

    constructor(private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit(): void {

        // d3.select('body').style('background', 'gray');

        this.svg = d3.select('svg');

        this.svg.attr('transform', 'translate(50,50)');

        this.line = this.svg.append('g').attr('class', 'horiz-line');
        this.rect = this.svg.append('g').attr('class', 'rect');
        this.rectProf = this.svg.append('g').attr('class', 'rectProf');
        this.verticalLines = this.svg.append('g').attr('class', 'vert-lines');
        this.dashedLines = this.svg.append('g').attr('class', 'dashed-lines');
        this.triangles = this.svg.append('g').attr('class', 'triangles');

        this.drawLineTop();
        this.drawRects();
        this.drawRectProf();
        this.drawVerticalLines();
        this.drawTriangles();

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
        this.rect.remove();
        this.line.remove();
        this.rectProf.remove();
        this.verticalLines.remove();
        this.triangles.remove();
        this.update();
    }

    private update() {
        this.rect = this.svg.append('g').attr('class', 'rect');
        this.line = this.svg.append('g').attr('class', 'lines');
        this.rectProf = this.svg.append('g').attr('class', 'rectProf');
        this.verticalLines = this.svg.append('g').attr('class', 'vert-lines');
        this.triangles = this.svg.append('g').attr('class', 'triangles');
        this.drawRects();
        this.drawLineTop();
        this.drawRectProf();
        this.drawVerticalLines();
        this.drawTriangles();
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

    drawLineTop() {
        //  insert line top
        this.line.append('line')
            .attr('x1', this._options.width / 2 - 75)
            .attr('y1', 50)
            .attr('x2', this._options.width / 2 + 185)
            .attr('y2', 50)
            .attr('stroke', 'black')
            .attr('stroke-width', 4);

        for (let i = 0; i < 2; i++) {
            this.line.append('line')
                .attr('x1', this._options.width / 2 + 12 + 65 * i)
                .attr('y1', 673)
                .attr('x2', this._options.width / 2 + 32 + 65 * i)
                .attr('y2', 673)
                .attr('stroke', 'black')
                .attr('stroke-width', 3);
        }
    }

    drawRectProf() {
        this.rectProf.append('rect')
            .attr('transform', 'translate(' + (this._options.width / 2 - 95) + ', 10)')
            .attr('width', 20)
            .attr('height', this._options.height - 70)
            .attr('fill', 'lightblue');
    }

    drawVerticalLines() {
        for (let i = 0; i < 2; i++) {
            this.verticalLines.append('line')
                .attr('x1', (this._options.width / 2) - 30 + 170 * i)
                .attr('y1', 52)
                .attr('x2', (this._options.width / 2) - 30 + 170 * i)
                .attr('y2', 200)
                .attr('stroke', 'black')
                .attr('stroke-width', 1);
        }

        for (let i = 0; i < 2; i++) {
            this.verticalLines.append('line')
                .attr('x1', (this._options.width / 2) - 8 + 128 * i)
                .attr('y1', 52)
                .attr('x2', (this._options.width / 2) - 8 + 128 * i)
                .attr('y2', 530)
                .attr('stroke', 'black')
                .attr('stroke-width', 1);
        }

        for (let i = 0; i < 2; i++) {
            this.verticalLines.append('line')
                .attr('x1', (this._options.width / 2) + 12 + 86 * i)
                .attr('y1', 52)
                .attr('x2', (this._options.width / 2) + 12 + 86 * i)
                .attr('y2', 700)
                .attr('stroke', 'black')
                .attr('stroke-width', 1);
        }

        for (let i = 0; i < 2; i++) {
            this.verticalLines.append('line')
                .attr('x1', (this._options.width / 2) + 32 + 46 * i)
                .attr('y1', 675)
                .attr('x2', (this._options.width / 2) + 32 + 46 * i)
                .attr('y2', 775)
                .attr('stroke', 'black')
                .attr('stroke-width', 1);
        }
    }

    drawRects() {
        for (let i = 0; i < 2; i++) {
            this.rect.append('rect')
                .attr('transform', 'translate(' + ((this._options.width / 2) - 50 + 190 * i) + ', 52)')
                .attr('width', 20)
                .attr('height', 150)
                .attr('fill', 'lightgray');
        }

        for (let i = 0; i < 2; i++) {
            this.rect.append('rect')
                .attr('transform', 'translate(' + ((this._options.width / 2) - 30 + 150 * i) + ', 270)')
                .attr('width', 20)
                .attr('height', 120)
                .attr('fill', 'lightgray');
        }

        for (let i = 0; i < 2; i++) {
            this.rect.append('rect')
                .attr('transform', 'translate(' + ((this._options.width / 2) - 30 + 150 * i) + ', 450)')
                .attr('width', 20)
                .attr('height', 80)
                .attr('fill', 'lightgray');
        }

        for (let i = 0; i < 2; i++) {
            this.rect.append('rect')
                .attr('transform', 'translate(' + ((this._options.width / 2) - 10 + 110 * i) + ', 550)')
                .attr('width', 20)
                .attr('height', 150)
                .attr('fill', 'lightgray');
        }

        for (let i = 0; i < 2; i++) {
            this.rect.append('rect')
                .attr('transform', 'translate(' + ((this._options.width / 2) + 10 + 70 * i) + ', 675)')
                .attr('width', 20)
                .attr('height', 100)
                .attr('fill', 'lightgray');
        }
    }


    private drawTriangles() {

        this.triangles.append('polygon')
            .attr('transform', 'translate(' + ((this._options.width / 2) - 140) + ', 153)')
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .attr('points', '100,48, 110,40, 110,48')
            .attr('fill', 'black');

        this.triangles.append('polygon')
            .attr('transform', 'translate(' + ((this._options.width / 2) - 140 + 180) + ', 153)')
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .attr('points', '100,40, 100,48, 110,48')
            .attr('fill', 'black');

        this.triangles.append('polygon')
            .attr('transform', 'translate(' + ((this._options.width / 2) - 118) + ', 482)')
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .attr('points', '100,48, 110,40, 110,48')
            .attr('fill', 'black');

        this.triangles.append('polygon')
            .attr('transform', 'translate(' + ((this._options.width / 2) - 160 + 180) + ', 482)')
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .attr('points', '100,40, 100,48, 110,48')
            .attr('fill', 'black');

        this.triangles.append('polygon')
            .attr('transform', 'translate(' + ((this._options.width / 2) - 118) + ', 482)')
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .attr('points', '100,48, 110,40, 110,48')
            .attr('fill', 'black');

        this.triangles.append('polygon')
            .attr('transform', 'translate(' + ((this._options.width / 2) - 160 + 180) + ', 482)')
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .attr('points', '100,40, 100,48, 110,48')
            .attr('fill', 'black');
    }
}
