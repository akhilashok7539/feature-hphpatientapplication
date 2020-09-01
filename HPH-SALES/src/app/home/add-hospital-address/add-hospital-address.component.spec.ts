import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHospitalAddressComponent } from './add-hospital-address.component';

describe('AddHospitalAddressComponent', () => {
  let component: AddHospitalAddressComponent;
  let fixture: ComponentFixture<AddHospitalAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHospitalAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHospitalAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
