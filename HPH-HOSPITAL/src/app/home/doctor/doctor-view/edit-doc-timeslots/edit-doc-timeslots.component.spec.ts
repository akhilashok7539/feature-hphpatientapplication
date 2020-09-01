import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDocTimeslotsComponent } from './edit-doc-timeslots.component';

describe('EditDocTimeslotsComponent', () => {
  let component: EditDocTimeslotsComponent;
  let fixture: ComponentFixture<EditDocTimeslotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDocTimeslotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDocTimeslotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
