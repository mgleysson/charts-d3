import {Injectable} from '@angular/core';
import * as d3 from 'd3';

@Injectable({
    providedIn: 'root'
})
export class Behavior2Service {

    constructor() {
    }

    applyZoomableBehaviour(zoomableOf: Element, element: Element) {
        const svg = d3.select(zoomableOf);
        const container = d3.select(element);
        svg.call(d3.zoom().on('zoom', () => {
            const transform = d3.event.transform;
            container.attr('transform', `translate(${transform.x}, ${transform.y}) scale(${transform.k})`);
        }));
    }
}
