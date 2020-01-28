import { Point } from './pointCoord';
import * as d3 from 'd3';

export class Segment implements d3.SimulationLinkDatum<Point> {

    index?: number;
    source: Point;
    target: Point;

    constructor(source, target) {
        this.source = source;
        this.target = target;
    }

}
