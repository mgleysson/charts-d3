import {Component, HostBinding, Input} from '@angular/core';
import { Point } from '../models/pointCoord';

@Component({
    selector: 'edg-point',
    template: `
        <svg:g attr.transform=" {{ transform() }}">
            <circle [classList]="options?.classes ? options?.classes : []"
                    [attr.r]="options?.r"></circle>
            <text fill="white">{{point.id}}</text>
        </svg:g>
    `
})

export class PointComponent {

    @Input()
    point: Point;

    @Input()
    options?: PointOptions;

    @HostBinding('attr.ngNoHost') noHost = '';

    constructor() { }

    transform(): string {
        return `translate(${this.point.x}, ${this.point.y})`;
    }

}

export class PointOptions {

    r: number;
    classes?: string[];

    constructor() {}
}
