import {Component, OnDestroy, OnInit} from '@angular/core';
import * as d3 from 'd3';


@Component({
    selector: 'app-line-chart-test3',
    templateUrl: './line-chart-test3.component.html',
    styleUrls: ['./line-chart-test3.component.scss']
})
export class LineChartTest3Component implements OnInit, OnDestroy {

    constructor() {
    }
    private lineChart: SVGLineChart;

    private timer;
    private timeRate = 7000;
    private timeDelta = 0;
    private timeLast = 0;

    ngOnInit() {
        const svg = d3.select('svg').append('g')
            .attr('transform', `translate(${70}, ${5})`);

        const w = 900; // * 0.8;
        const x = w * 0.2;
        const y = -w * 0.01;
        const h = 700;

        this.lineChart = new SVGLineChart(svg, {
            x, y, width: w, height: h, label: 'Line Chart'
        });
        this.lineChart.update([]);
        this.timer = d3.timer(this.tick.bind(this));
        // this.updateData();
    }

    updateData() {
        const data = [
            Math.random() * 10
        ];

        this.lineChart.update(data);
    }

    tick(elapsed) {
        if (this.timeDelta > this.timeRate) {
            this.timeDelta = 0;
            this.updateData();
        }
        this.timeDelta += elapsed - this.timeLast;
        this.timeLast = elapsed;
    }

    ngOnDestroy() {
        this.timer.stop();
    }

}

export class SVGLineChart {
    params;
    private timer;
    private timeRate = 5000;
    private timeDelta = 0;
    private timeLast = 0;

    constructor(private parent, {

        x = 1, y = 1,
        width = 400,
        height = 600,
        label = 'Chart',
        margin = {
            left: 30,
            top: 40,
            bottom: 30,
            right: 30
        },
        style = {
            highlight: 'white',
            lineColor: 'white',
            background: '#333',
            fill: '#222',
            lineWeight: 2,
            textColor: 'gray'
        }

    } = {}) {
        this.params = {
            x,
            y,
            width,
            height,
            label,
            margin,
            style
        };

        // calculate new size
        this.params.width -= (this.params.margin.left + this.params.margin.right + 2);
        this.params.height -= (this.params.margin.top + this.params.margin.bottom);

        const root = this.parent.append('g')
            .attr('transform', `translate(${x}, ${y})`); // move

        // this.params.style.
        root.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('fill', this.params.style.fill);

        this.container = root.append('g')// create graph container
        // x : add space for left axis
        // y : add space for title
            .attr('transform', `translate(${this.params.margin.left}, ${this.params.margin.top})`);

        // Make label
        this.container.append('text')
            .attr('y', -this.params.margin.top / 2)
            .attr('x', this.params.width / 2)
            .text(this.params.label)
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'central')
            .attr('fill', this.params.style.textColor);
        // Create background fill
        this.container.append('rect')
        // tslint:disable-next-line:radix
            .attr('width', parseInt(this.params.width))
            .attr('height', this.params.height)
            .attr('fill', '#333');
        // create axis containers
        this.container.append('g').attr('class', 'xAxis');
        this.container.append('g').attr('class', 'yAxis');
        this.container.append('path'); // create line container
    }

    container;
    xAxisCall = d3.axisBottom(null);
    yAxisCall = d3.axisLeft(null);
    xScale = d3.scaleLinear();
    yScale = d3.scaleLinear();

    dataMin = Infinity;
    dataMax = -Infinity;
    data: number[] = [];

    update(newDataToAdd: number[]) {

        // calculate domain limits
        const min = Math.min(...newDataToAdd);
        if (this.dataMin > min) {
            this.dataMin = min;
        }
        const max = Math.max(...newDataToAdd);
        if (this.dataMax < max) {
            this.dataMax = max;
        }

        // Merge 2 datasets
        this.data = this.data.concat(newDataToAdd);

        this.timer = d3.timer(this.tick2.bind(this));

    }

    tick2(elapsed) {
        if (this.timeDelta > this.timeRate) {
            this.timeDelta = 0;
            this.scaleChart();
        }
        this.timeDelta += elapsed - this.timeLast;
        this.timeLast = elapsed;
    }

    scaleChart() {
        this.xScale
            .domain([this.data.length - 5, this.data.length]) // domain as data length
            .range([100, this.params.width]); // range as chart size
        this.xAxisCall.scale(this.xScale) // update
            .tickSize(this.params.height) // resize ticks to fit char height
            .ticks(6); // split axis into 6 sections
        this.yScale
            .domain([this.dataMin, this.dataMax])// doamin as data min & max
            .range([this.params.height, 0]); // range as chart size
        this.yAxisCall.scale(this.yScale)// update
            .ticks(6); // split axis into 6 sections


        const line = d3.line()// create line function
            .x((d, i) => this.xScale(i))// set x position relative to index
            .y(d => this.yScale(d)); // set y position relative to value

        // update & animate
        const animation = d3.transition().duration(1000);

        this.container.select('.xAxis')
            .transition(animation)
            .call(this.xAxisCall)

            .attr('stroke', this.params.style.textColor) // change text color
            .attr('fill', this.params.style.background); // set background color


        this.container.select('.yAxis')
            .transition(animation)
            .call(this.yAxisCall)

            .attr('stroke', this.params.style.textColor) // change text color
        ;

        const linePath = line(this.data);

        this.container.select('path')
            .attr('stroke', this.params.style.highlight)
            .transition(animation)
            .attr('stroke-width', this.params.style.lineWeight)
            .attr('fill', 'none')
            .attr('stroke', this.params.style.lineColor)
            .attr('d', linePath);
    }
}
