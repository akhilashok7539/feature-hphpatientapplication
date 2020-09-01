import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalMobilenumberComponent } from './hospital-mobilenumber.component';

describe('HospitalMobilenumberComponent', () => {
  let component: HospitalMobilenumberComponent;
  let fixture: ComponentFixture<HospitalMobilenumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalMobilenumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalMobilenumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
