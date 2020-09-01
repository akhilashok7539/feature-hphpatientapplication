import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHospitalAddressComponent } from './edit-hospital-address.component';

describe('EditHospitalAddressComponent', () => {
  let component: EditHospitalAddressComponent;
  let fixture: ComponentFixture<EditHospitalAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHospitalAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHospitalAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
