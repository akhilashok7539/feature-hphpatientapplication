import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboardchart2Component } from './dashboardchart2.component';

describe('Dashboardchart2Component', () => {
  let component: Dashboardchart2Component;
  let fixture: ComponentFixture<Dashboardchart2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboardchart2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboardchart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
