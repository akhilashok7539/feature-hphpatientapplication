import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHospitalPasswordComponent } from './add-hospital-password.component';

describe('AddHospitalPasswordComponent', () => {
  let component: AddHospitalPasswordComponent;
  let fixture: ComponentFixture<AddHospitalPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHospitalPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHospitalPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
