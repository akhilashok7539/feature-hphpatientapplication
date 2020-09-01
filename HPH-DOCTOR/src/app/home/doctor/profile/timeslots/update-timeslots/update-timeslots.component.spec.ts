import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTimeslotsComponent } from './update-timeslots.component';

describe('UpdateTimeslotsComponent', () => {
  let component: UpdateTimeslotsComponent;
  let fixture: ComponentFixture<UpdateTimeslotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTimeslotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTimeslotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
