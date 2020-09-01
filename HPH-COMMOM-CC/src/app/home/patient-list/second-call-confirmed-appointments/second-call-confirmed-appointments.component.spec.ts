import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondCallConfirmedAppointmentsComponent } from './second-call-confirmed-appointments.component';

describe('SecondCallConfirmedAppointmentsComponent', () => {
  let component: SecondCallConfirmedAppointmentsComponent;
  let fixture: ComponentFixture<SecondCallConfirmedAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondCallConfirmedAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondCallConfirmedAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
