import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHospitalOwnerIdProofComponent } from './edit-hospital-owner-id-proof.component';

describe('EditHospitalOwnerIdProofComponent', () => {
  let component: EditHospitalOwnerIdProofComponent;
  let fixture: ComponentFixture<EditHospitalOwnerIdProofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHospitalOwnerIdProofComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHospitalOwnerIdProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
