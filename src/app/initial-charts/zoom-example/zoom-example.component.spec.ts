import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomExampleComponent } from './zoom-example.component';

describe('ZoomExampleComponent', () => {
  let component: ZoomExampleComponent;
  let fixture: ComponentFixture<ZoomExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
