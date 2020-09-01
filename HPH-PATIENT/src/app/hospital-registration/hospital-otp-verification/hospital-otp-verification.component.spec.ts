import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalOtpVerificationComponent } from './hospital-otp-verification.component';

describe('HospitalOtpVerificationComponent', () => {
  let component: HospitalOtpVerificationComponent;
  let fixture: ComponentFixture<HospitalOtpVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalOtpVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalOtpVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
