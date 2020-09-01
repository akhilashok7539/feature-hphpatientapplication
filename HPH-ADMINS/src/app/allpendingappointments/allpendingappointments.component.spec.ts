import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllpendingappointmentsComponent } from './allpendingappointments.component';

describe('AllpendingappointmentsComponent', () => {
  let component: AllpendingappointmentsComponent;
  let fixture: ComponentFixture<AllpendingappointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllpendingappointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllpendingappointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
