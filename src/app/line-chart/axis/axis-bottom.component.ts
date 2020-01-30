import {AfterViewInit, Component, ElementRef, HostBinding, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {Behavior2Service} from '../../behavior/behavior2.service';

@Component({
    selector: 'edg-axis-bottom',
    template: `
        <svg:g #axisBottom [attr.transform]="translate() "></svg:g>
    `
})
export class AxisBottomComponent implements OnInit, AfterViewInit {

    @Input()
    svg: Element;

    @ViewChild('axisBottom', {static: true})
    axisBottom: ElementRef;

    width: number;
    height: number;

    @HostBinding('attr.ngNoHost') noHost = '';

    constructor(private behaviorService: Behavior2Service) {
    }

    ngOnInit() {
        // this.setScale();
    }

    ngAfterViewInit(): void {
        // this.behaviorService.applyZoomableBehaviour(this.axisLeft.nativeElement, this.svg);
        this.setScale();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
        this.setScale();
    }

    setScale(): void {
        this.width = this.svg.clientWidth;
        this.height = this.svg.clientHeight;

        let x = d3.scaleLinear().domain([0, 100]).range([0, this.width]);
        const xAxis = d3.axisTop(x);
        const gX = d3.select(this.axisBottom.nativeElement).call(xAxis);
        const copyX = x.copy();
        const zoom = d3.zoom()
            .on('zoom', () => {
                // create new scale ojects based on event
                x = d3.event.transform.rescaleX(copyX);
                // update axes
                gX.call(xAxis.scale(x));
            });
    }

    translate() {
        return `translate(40, ${this.height - 25}) scale(${0.95})`;
    }

}


