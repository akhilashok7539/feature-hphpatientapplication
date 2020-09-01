import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHospitalEstIdProofComponent } from './edit-hospital-est-id-proof.component';

describe('EditHospitalEstIdProofComponent', () => {
  let component: EditHospitalEstIdProofComponent;
  let fixture: ComponentFixture<EditHospitalEstIdProofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHospitalEstIdProofComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHospitalEstIdProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
