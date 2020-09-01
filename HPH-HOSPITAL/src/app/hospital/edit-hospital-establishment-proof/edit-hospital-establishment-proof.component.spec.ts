import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHospitalEstablishmentProofComponent } from './edit-hospital-establishment-proof.component';

describe('EditHospitalEstablishmentProofComponent', () => {
  let component: EditHospitalEstablishmentProofComponent;
  let fixture: ComponentFixture<EditHospitalEstablishmentProofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHospitalEstablishmentProofComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHospitalEstablishmentProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
