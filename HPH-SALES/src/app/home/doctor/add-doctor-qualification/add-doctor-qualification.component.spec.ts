import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctorQualificationComponent } from './add-doctor-qualification.component';

describe('AddDoctorQualificationComponent', () => {
  let component: AddDoctorQualificationComponent;
  let fixture: ComponentFixture<AddDoctorQualificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDoctorQualificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDoctorQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
