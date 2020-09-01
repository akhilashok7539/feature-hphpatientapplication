import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepartmentHeadComponent } from './add-department-head.component';

describe('AddDepartmentHeadComponent', () => {
  let component: AddDepartmentHeadComponent;
  let fixture: ComponentFixture<AddDepartmentHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDepartmentHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDepartmentHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
