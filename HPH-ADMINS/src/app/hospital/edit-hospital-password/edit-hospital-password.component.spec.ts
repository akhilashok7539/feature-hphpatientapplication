import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHospitalPasswordComponent } from './edit-hospital-password.component';

describe('EditHospitalPasswordComponent', () => {
  let component: EditHospitalPasswordComponent;
  let fixture: ComponentFixture<EditHospitalPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHospitalPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHospitalPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
