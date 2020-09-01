import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedanappointmentSectionComponent } from './bookedanappointment-section.component';

describe('BookedanappointmentSectionComponent', () => {
  let component: BookedanappointmentSectionComponent;
  let fixture: ComponentFixture<BookedanappointmentSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedanappointmentSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedanappointmentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
