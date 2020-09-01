import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctorSymptomsComponent } from './add-doctor-symptoms.component';

describe('AddDoctorSymptomsComponent', () => {
  let component: AddDoctorSymptomsComponent;
  let fixture: ComponentFixture<AddDoctorSymptomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDoctorSymptomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDoctorSymptomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
