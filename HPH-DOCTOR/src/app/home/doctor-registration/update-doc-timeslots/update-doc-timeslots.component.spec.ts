import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDocTimeslotsComponent } from './update-doc-timeslots.component';

describe('UpdateDocTimeslotsComponent', () => {
  let component: UpdateDocTimeslotsComponent;
  let fixture: ComponentFixture<UpdateDocTimeslotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDocTimeslotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDocTimeslotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
