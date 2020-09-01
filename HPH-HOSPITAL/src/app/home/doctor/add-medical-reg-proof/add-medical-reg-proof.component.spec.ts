import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicalRegProofComponent } from './add-medical-reg-proof.component';

describe('AddMedicalRegProofComponent', () => {
  let component: AddMedicalRegProofComponent;
  let fixture: ComponentFixture<AddMedicalRegProofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMedicalRegProofComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMedicalRegProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
