import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHospitalLogoComponent } from './add-hospital-logo.component';

describe('AddHospitalLogoComponent', () => {
  let component: AddHospitalLogoComponent;
  let fixture: ComponentFixture<AddHospitalLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHospitalLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHospitalLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
