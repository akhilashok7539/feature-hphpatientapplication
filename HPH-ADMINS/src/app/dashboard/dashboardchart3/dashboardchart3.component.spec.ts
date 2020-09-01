import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboardchart3Component } from './dashboardchart3.component';

describe('Dashboardchart3Component', () => {
  let component: Dashboardchart3Component;
  let fixture: ComponentFixture<Dashboardchart3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboardchart3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboardchart3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
