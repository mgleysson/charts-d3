import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartTest3Component } from './line-chart-test3.component';

describe('LineChartTest3Component', () => {
  let component: LineChartTest3Component;
  let fixture: ComponentFixture<LineChartTest3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineChartTest3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartTest3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
