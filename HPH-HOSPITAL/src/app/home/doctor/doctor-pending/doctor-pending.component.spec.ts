import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPendingComponent } from './doctor-pending.component';

describe('DoctorPendingComponent', () => {
  let component: DoctorPendingComponent;
  let fixture: ComponentFixture<DoctorPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
