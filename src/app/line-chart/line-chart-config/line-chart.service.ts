import { Injectable } from '@angular/core';
import { Point } from '../models/pointCoord';
import { LineChart } from './line-chart';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class LineChartService {

    constructor() {}

    applyDraggableBehaviour(element: Element, point: Point, lineChart: LineChart) {
        d3.select(element).call(d3.drag().on('start', (): void => {
            d3.event.sourceEvent.stopPropagation();

            if (!d3.event.active) {
                lineChart.simulation.alphaTarget(0.3).restart();
            }

            d3.event.on('drag', (): void => {
                point.fx = d3.event.x;
                point.fy = d3.event.y;
            }).on('end', (): void => {
                if (!d3.event.active) {
                    lineChart.simulation.alphaTarget(0);
                }

                point.fx = null;
                point.fy = null;
            });
        }));
    }
}
