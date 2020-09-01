import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHospitalLogoComponent } from './edit-hospital-logo.component';

describe('EditHospitalLogoComponent', () => {
  let component: EditHospitalLogoComponent;
  let fixture: ComponentFixture<EditHospitalLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHospitalLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHospitalLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
