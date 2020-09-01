import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorviewFullComponent } from './doctorview-full.component';

describe('DoctorviewFullComponent', () => {
  let component: DoctorviewFullComponent;
  let fixture: ComponentFixture<DoctorviewFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorviewFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorviewFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
