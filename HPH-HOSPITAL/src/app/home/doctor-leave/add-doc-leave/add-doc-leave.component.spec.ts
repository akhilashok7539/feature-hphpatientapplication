import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocLeaveComponent } from './add-doc-leave.component';

describe('AddDocLeaveComponent', () => {
  let component: AddDocLeaveComponent;
  let fixture: ComponentFixture<AddDocLeaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDocLeaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
