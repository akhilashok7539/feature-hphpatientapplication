import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctorIdProofComponent } from './add-doctor-id-proof.component';

describe('AddDoctorIdProofComponent', () => {
  let component: AddDoctorIdProofComponent;
  let fixture: ComponentFixture<AddDoctorIdProofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDoctorIdProofComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDoctorIdProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
