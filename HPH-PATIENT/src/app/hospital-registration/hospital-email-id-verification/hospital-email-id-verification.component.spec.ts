import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalEmailIdVerificationComponent } from './hospital-email-id-verification.component';

describe('HospitalEmailIdVerificationComponent', () => {
  let component: HospitalEmailIdVerificationComponent;
  let fixture: ComponentFixture<HospitalEmailIdVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalEmailIdVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalEmailIdVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
