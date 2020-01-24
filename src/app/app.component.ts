import {Component, OnInit} from '@angular/core';

interface LineChart{
    date: string;
    value: number;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    title = 'charts-d3';

}
