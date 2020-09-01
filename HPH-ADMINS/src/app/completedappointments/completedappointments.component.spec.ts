import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedappointmentsComponent } from './completedappointments.component';

describe('CompletedappointmentsComponent', () => {
  let component: CompletedappointmentsComponent;
  let fixture: ComponentFixture<CompletedappointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedappointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedappointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
