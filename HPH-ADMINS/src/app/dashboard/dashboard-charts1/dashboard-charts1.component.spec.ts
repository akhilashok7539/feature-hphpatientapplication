import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCharts1Component } from './dashboard-charts1.component';

describe('DashboardCharts1Component', () => {
  let component: DashboardCharts1Component;
  let fixture: ComponentFixture<DashboardCharts1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCharts1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCharts1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
