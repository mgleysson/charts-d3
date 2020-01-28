import { Component, Input, HostBinding } from '@angular/core';
import { Segment } from '../models/segment';


@Component({
    selector: 'edg-segment',
    template: `
        <svg:g>
            <line [classList]="options?.classes ? options?.classes : []"
                  [attr.x1]="segment.source.x" [attr.y1]="segment.source.y"
                  [attr.x2]="segment.target.x" [attr.y2]="segment.target.y" stroke="black"/>
        </svg:g>
    `
})
export class SegmentComponent {

    @Input()
    segment: Segment;

    @Input()
    options?: LineOptions;

    @HostBinding('attr.ngNoHost') noHost = '';

    constructor() { }

}

export class LineOptions {

    classes?: string[];

    constructor() {}
}
