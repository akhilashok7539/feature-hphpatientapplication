import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorInactiveComponent } from './doctor-inactive.component';

describe('DoctorInactiveComponent', () => {
  let component: DoctorInactiveComponent;
  let fixture: ComponentFixture<DoctorInactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorInactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
