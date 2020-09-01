import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctorMedicalRegProofComponent } from './add-doctor-medical-reg-proof.component';

describe('AddDoctorMedicalRegProofComponent', () => {
  let component: AddDoctorMedicalRegProofComponent;
  let fixture: ComponentFixture<AddDoctorMedicalRegProofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDoctorMedicalRegProofComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDoctorMedicalRegProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
