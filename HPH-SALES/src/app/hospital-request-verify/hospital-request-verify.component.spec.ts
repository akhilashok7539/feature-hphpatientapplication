import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalRequestVerifyComponent } from './hospital-request-verify.component';

describe('HospitalRequestVerifyComponent', () => {
  let component: HospitalRequestVerifyComponent;
  let fixture: ComponentFixture<HospitalRequestVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalRequestVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalRequestVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
