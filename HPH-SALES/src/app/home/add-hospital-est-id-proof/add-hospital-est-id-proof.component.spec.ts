import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHospitalEstIdProofComponent } from './add-hospital-est-id-proof.component';

describe('AddHospitalEstIdProofComponent', () => {
  let component: AddHospitalEstIdProofComponent;
  let fixture: ComponentFixture<AddHospitalEstIdProofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHospitalEstIdProofComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHospitalEstIdProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
