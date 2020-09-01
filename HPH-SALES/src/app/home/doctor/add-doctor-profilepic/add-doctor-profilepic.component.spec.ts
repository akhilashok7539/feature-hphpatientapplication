import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctorProfilepicComponent } from './add-doctor-profilepic.component';

describe('AddDoctorProfilepicComponent', () => {
  let component: AddDoctorProfilepicComponent;
  let fixture: ComponentFixture<AddDoctorProfilepicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDoctorProfilepicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDoctorProfilepicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
