import { EventEmitter } from '@angular/core';
import { Segment } from '../models/segment';
import { Point } from '../models/pointCoord';
import * as d3 from 'd3';


const FORCES = {
    LINKS: 2 / 10,
    COLLISION: 200,
    CHARGE: -1000
};


export class LineChart {

    public ticker: EventEmitter<d3.Simulation<Point, Segment>> = new EventEmitter();
    public simulation: d3.Simulation<any, any>;

    public nodes: Point[] = [];
    public links: Segment[] = [];

    constructor(points: Point[], segments: Segment[], options: { width, height })  {
        this.nodes = points;
        this.links = segments;

        this.initSimulation(options);
    }

    initNodes() {
        if (!this.simulation) {
            throw new Error('simulation was not initialized yet.');
        }

        this.simulation.nodes(this.nodes);
    }

    initLinks() {
        if (!this.simulation) {
            throw new Error('simulation was not initialized yet.');
        }

        this.simulation.force('links', d3.forceLink(this.links).id((d: any) => d.id ).strength(FORCES.LINKS));
    }

    initSimulation(options) {
        if (!options || !options.width || !options.height) {
            throw new Error('missing options when initializing simulation.');
        }

        if (!this.simulation) {
            const ticker = this.ticker;

            this.simulation = d3.forceSimulation()
                .force('charge', d3.forceManyBody().strength(FORCES.CHARGE));

            this.simulation.on('tick', function() { ticker.emit(this); });

            this.initNodes();
            this.initLinks();
        }

        this.simulation.force('centers', d3.forceCenter(options.width / 2, options.height / 2));
        this.simulation.restart();
    }

}
