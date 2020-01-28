import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {Behavior2Service} from './behavior2.service';

@Directive({
  selector: '[edgZoomableOf]'
})
export class ZoomableDirective implements OnInit {

    @Input('edgZoomableOf') zoomableOf: Element;

    constructor(private behaviourService: Behavior2Service, private elementRef: ElementRef) { }

    ngOnInit(): void {
        this.behaviourService.applyZoomableBehaviour(this.zoomableOf, this.elementRef.nativeElement);
    }

}
