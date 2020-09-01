import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTimeslotsDocComponent } from './edit-timeslots-doc.component';

describe('EditTimeslotsDocComponent', () => {
  let component: EditTimeslotsDocComponent;
  let fixture: ComponentFixture<EditTimeslotsDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTimeslotsDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTimeslotsDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
