import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstCallConfirmedAppointmentsComponent } from './first-call-confirmed-appointments.component';

describe('FirstCallConfirmedAppointmentsComponent', () => {
  let component: FirstCallConfirmedAppointmentsComponent;
  let fixture: ComponentFixture<FirstCallConfirmedAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstCallConfirmedAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstCallConfirmedAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
