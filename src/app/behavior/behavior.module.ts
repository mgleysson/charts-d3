import {NgModule} from '@angular/core';
import {ZoomableDirective} from './zoomable.directive';
import {Behavior2Service} from './behavior2.service';


@NgModule({
    declarations: [ZoomableDirective],
    exports: [
        ZoomableDirective
    ],
    providers: [
        Behavior2Service
    ]
})
export class BehaviorModule {
}
