import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHospitalOwnerIdProofComponent } from './add-hospital-owner-id-proof.component';

describe('AddHospitalOwnerIdProofComponent', () => {
  let component: AddHospitalOwnerIdProofComponent;
  let fixture: ComponentFixture<AddHospitalOwnerIdProofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHospitalOwnerIdProofComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHospitalOwnerIdProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
