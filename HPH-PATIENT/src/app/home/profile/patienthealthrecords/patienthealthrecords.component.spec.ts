import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatienthealthrecordsComponent } from './patienthealthrecords.component';

describe('PatienthealthrecordsComponent', () => {
  let component: PatienthealthrecordsComponent;
  let fixture: ComponentFixture<PatienthealthrecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatienthealthrecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatienthealthrecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
