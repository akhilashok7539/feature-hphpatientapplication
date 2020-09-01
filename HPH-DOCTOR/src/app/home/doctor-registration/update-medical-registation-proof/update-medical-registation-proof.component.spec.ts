import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMedicalRegistationProofComponent } from './update-medical-registation-proof.component';

describe('UpdateMedicalRegistationProofComponent', () => {
  let component: UpdateMedicalRegistationProofComponent;
  let fixture: ComponentFixture<UpdateMedicalRegistationProofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMedicalRegistationProofComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMedicalRegistationProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
