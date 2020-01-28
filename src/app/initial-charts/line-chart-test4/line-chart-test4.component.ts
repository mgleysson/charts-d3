import {Component, ElementRef, Input, OnInit} from '@angular/core';
import * as d3 from 'd3';

interface LineChart {
    date: string;
    value: number;
}

const lineChart: LineChart[] = [
    {
        date: 'Jan',
        value: 400
    },
    {
        date: 'Feb',
        value: 300
    },
    {
        date: 'Mar',
        value: 250
    },
    {
        date: 'Apr',
        value: 450
    },
    {
        date: 'May',
        value: 220
    },
    {
        date: 'June',
        value: 210
    },
    {
        date: 'July',
        value: 250
    },
    {
        date: 'Aug',
        value: 100
    },
    {
        date: 'Sept',
        value: 220
    },
    {
        date: 'Oct',
        value: 360
    },
    {
        date: 'Nov',
        value: 234
    },
    {
        date: 'Dec',
        value: 290
    }
];

@Component({
  selector: 'app-line-chart-test4',
  templateUrl: './line-chart-test4.component.html',
  styleUrls: ['./line-chart-test4.component.scss']
})
export class LineChartTest4Component implements OnInit {

    lineData: LineChart[];

    private w = 600;
    private h = 400;
    private divH = 375;
    private halfLength: number;
    private margin = {top: 10, right: 50, bottom: 80, left: 50};
    private width = this.w - this.margin.left - this.margin.right;
    private height = this.h - this.margin.top - this.margin.bottom;

    private x0: any;
    private y0: any;
    private svg: any;
    private g: any;
    private chart: any;
    private layersBarArea: any;
    private layersBar: any;
    private x0Axis: any;
    private y0Axis: any;
    private valueline: any;
    private lineArea: any;

    private colors = ['#00D7D2', '#313c53', '#FFC400'];

    constructor(private container: ElementRef) {

    }

    ngOnInit() {
        this.lineData = lineChart;
        this.initScales();
        this.initSvg();
        this.drawLine(this.lineData);
        this.drawAxis();
    }

    private initScales() {
        this.x0 = d3.scaleBand()
            .rangeRound([0, this.width])
            .padding(0.05);

        this.y0 = d3.scaleLinear()
            .range([this.height, 0]);

    }

    private initSvg() {

        this.svg = d3.select(this.container.nativeElement)
            .select('.chart-container')
            .append('svg')
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('class', 'chart')
            .attr('viewBox', '0 0 600 400');

        this.chart = this.svg.append('g')
            .classed('chart-contents', true)
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

        this.layersBarArea = this.chart.append('g')
            .classed('layers', true);

        this.lineArea = this.chart.append('g')
            .classed('line', true);
    }

    private drawAxis() {
        this.x0Axis = this.chart.append('g')
            .classed('x-axis', true)
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3.axisBottom(this.x0));

        this.y0Axis = this.chart.append('g')
            .classed('y0-axis', true)
            .call(d3.axisLeft(this.y0));

    }

    private drawLine(linedata: any) {
        const that = this;
        const valueline = d3.line()
            .x(function(d, i) {
                return that.x0(d.date) + 0.5 * that.x0.bandwidth();
            })
            .y(function(d) {
                return that.y0(d.value);
            });

        this.x0.domain(linedata.map((d: any) => {
            return d.date;
        }));

        // this.y0.domain(d3.extent(linedata, function(d) {
        //   return d.value
        // }));

        this.y0.domain([0, 500]);

        this.lineArea.append('path')
            .data([linedata])
            .attr('class', 'line')
            .attr('d', valueline)
            .transition()
            .duration(1000)
            .attrTween('d', pathTween);

        function pathTween() {
            const interpolate = d3.scaleLinear()
                .domain([0, 1])
                .range(d3.range(1, linedata.length + 1));
            // tslint:disable-next-line:only-arrow-functions
            // return function(t) {
            //     return line(linedata.slice(0, interpolate(t)));
            // };
        }​
    }

}
