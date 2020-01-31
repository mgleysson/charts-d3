import {AfterViewInit, Component, ElementRef, HostBinding, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {Behavior2Service} from '../../behavior/behavior2.service';

@Component({
    selector: 'edg-axis-left',
    template: `
        <svg:g #axisLeft [attr.transform]="translate()"></svg:g>
    `
})
export class AxisLeftComponent implements AfterViewInit, OnInit {

    @Input()
    svg: Element;

    @Input()
    scaleY: any;

    @ViewChild('axisLeft', {static: true})
    axisLeft: ElementRef;

    width: number;
    height: number;
    axisY: any;
    zoom: any;

    @HostBinding('attr.ngNoHost') noHost = '';


    constructor(private behaviorService: Behavior2Service) { }

    ngOnInit(): void {
        this.scaleY = this.scaleY.domain([0, 100]);
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
        this.scaleY = this.scaleY.range([this.height, 0]);
        this.axisY = d3.axisLeft(this.scaleY);
        d3.select(this.axisLeft.nativeElement).call(this.axisY);
        // d3.select(this.axisLeft.nativeElement).call(this.zoomAxis());
    }

    translate() {
        return `scale(${0.95}) translate(45, 20)`;
    }

    zoomAxis() {
        this.zoom = d3.zoom().on('zoom', this.zoomFunction());
    }

    zoomFunction() {
        // create new scale ojects based on event
        this.scaleY = d3.event.transform.rescaleY(this.scaleY);
        this.axisY = d3.axisLeft(this.scaleY);

        // update axes
        // gY.call(yAxis.scale(yAxisScale));
        d3.select(this.axisLeft.nativeElement).call(this.axisY);
    }

}


