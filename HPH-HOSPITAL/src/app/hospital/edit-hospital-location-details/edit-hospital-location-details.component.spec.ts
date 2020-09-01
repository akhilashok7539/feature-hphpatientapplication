import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHospitalLocationDetailsComponent } from './edit-hospital-location-details.component';

describe('EditHospitalLocationDetailsComponent', () => {
  let component: EditHospitalLocationDetailsComponent;
  let fixture: ComponentFixture<EditHospitalLocationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHospitalLocationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHospitalLocationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
