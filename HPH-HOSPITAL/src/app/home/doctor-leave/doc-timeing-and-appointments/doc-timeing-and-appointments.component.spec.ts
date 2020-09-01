import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTimeingAndAppointmentsComponent } from './doc-timeing-and-appointments.component';

describe('DocTimeingAndAppointmentsComponent', () => {
  let component: DocTimeingAndAppointmentsComponent;
  let fixture: ComponentFixture<DocTimeingAndAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocTimeingAndAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTimeingAndAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
