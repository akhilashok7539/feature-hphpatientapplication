import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctortodepartmentComponent } from './add-doctortodepartment.component';

describe('AddDoctortodepartmentComponent', () => {
  let component: AddDoctortodepartmentComponent;
  let fixture: ComponentFixture<AddDoctortodepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDoctortodepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDoctortodepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
