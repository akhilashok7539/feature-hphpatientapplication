import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingDepartmentToDoctorComponent } from './mapping-department-to-doctor.component';

describe('MappingDepartmentToDoctorComponent', () => {
  let component: MappingDepartmentToDoctorComponent;
  let fixture: ComponentFixture<MappingDepartmentToDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingDepartmentToDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingDepartmentToDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
