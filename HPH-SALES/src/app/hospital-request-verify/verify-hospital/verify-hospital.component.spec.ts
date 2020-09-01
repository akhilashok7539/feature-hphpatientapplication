import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyHospitalComponent } from './verify-hospital.component';

describe('VerifyHospitalComponent', () => {
  let component: VerifyHospitalComponent;
  let fixture: ComponentFixture<VerifyHospitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyHospitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
