import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctorTimeslotsComponent } from './add-doctor-timeslots.component';

describe('AddDoctorTimeslotsComponent', () => {
  let component: AddDoctorTimeslotsComponent;
  let fixture: ComponentFixture<AddDoctorTimeslotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDoctorTimeslotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDoctorTimeslotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
