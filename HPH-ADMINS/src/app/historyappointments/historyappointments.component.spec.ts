import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryappointmentsComponent } from './historyappointments.component';

describe('HistoryappointmentsComponent', () => {
  let component: HistoryappointmentsComponent;
  let fixture: ComponentFixture<HistoryappointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryappointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryappointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
