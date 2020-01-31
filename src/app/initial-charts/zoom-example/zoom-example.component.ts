import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-zoom-example',
    templateUrl: './zoom-example.component.html',
    styleUrls: ['./zoom-example.component.scss']
})
export class ZoomExampleComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        const svgWidth = 1200;
        const svgHeight = 600;

        const margin = {top: 30, right: 40, bottom: 50, left: 60};

        const width = svgWidth - margin.left - margin.right;
        const height = svgHeight - margin.top - margin.bottom;

        const originalCircle = {
            cx: 5,
            cy: 5,
            r: 20
        };

        const svgViewport = d3.select('body')
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight)
            .style('background', 'white');


// create scale objects
        let xAxisScale = d3.scaleLinear()
            .domain([0, 10])
            .range([0, width]);

        let yAxisScale = d3.scaleLinear()
            .domain([0, 10])
            .range([height, 0]);

        const copyX = xAxisScale.copy();
        const copyY = yAxisScale.copy();
// create axis objects
        const xAxis = d3.axisBottom(xAxisScale);
        const yAxis = d3.axisLeft(yAxisScale);

        console.log(xAxis);

// Zoom Function
        const zoom = d3.zoom()
            .on('zoom', zoomFunction);

// Inner Drawing Space
        const innerSpace = svgViewport.append('g')
            .attr('class', 'inner_space')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .call(zoom);

// append some dummy data
        const circles = innerSpace.append('circle')
            .attr('id', 'circles')
            .attr('cx', xAxisScale(originalCircle.cx))
            .attr('cy', yAxisScale(originalCircle.cy))
            .attr('r', originalCircle.r)

// Draw Axis
        const gX = innerSpace.append('g')
            .attr('class', 'axis axis-x')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

        const gY = innerSpace.append('g')
            .attr('class', 'axis axis-y')
            .call(yAxis);

// append zoom area
//         const view = innerSpace.append('rect')
//           .attr('class', 'rectangle')
//           .attr('width', width)
//           .attr('height', height)
//           .call(zoom);

        function zoomFunction() {
            // create new scale ojects based on event
            const new_xScale = d3.event.transform.rescaleX(copyX);
            const new_yScale = d3.event.transform.rescaleY(copyY);
            xAxisScale = new_xScale;
            yAxisScale = new_yScale;
            // console.log(d3.event.transform);

            // update axes
            gX.call(xAxis.scale(xAxisScale));
            gY.call(yAxis.scale(yAxisScale));

            // update circle
            circles.attr('transform', d3.event.transform);
        }

    }

}
