import {AfterViewInit, Component, ElementRef, HostBinding, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {Segment} from '../models/segment';
import * as d3 from 'd3';
import {Behavior2Service} from '../../behavior/behavior2.service';

@Component({
    selector: 'edg-axis-left',
    template: `
        <svg:g #axisLeft [attr.transform]="translate()"></svg:g>
    `
})
export class AxisLeftComponent implements AfterViewInit {

    @Input()
    svg: Element;

    @ViewChild('axisLeft', {static: true})
    axisLeft: ElementRef;

    width: number;
    height: number;

    @HostBinding('attr.ngNoHost') noHost = '';

    constructor(private behaviorService: Behavior2Service) {
    }


    ngAfterViewInit(): void {
        this.setScale();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
        this.setScale();
    }

    setScale(): void {
        this.width = this.svg.clientWidth;
        this.height = this.svg.clientHeight;

        const x = d3.scaleLinear().domain([0, 100]).range([this.height, 0]);
        d3.select(this.axisLeft.nativeElement).call(d3.axisLeft(x));
    }

    translate() {
        return `translate(25, -10)`;
    }

}


