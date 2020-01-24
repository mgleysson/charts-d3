import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartTest4Component } from './line-chart-test4.component';

describe('LineChartTest4Component', () => {
  let component: LineChartTest4Component;
  let fixture: ComponentFixture<LineChartTest4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineChartTest4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartTest4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
