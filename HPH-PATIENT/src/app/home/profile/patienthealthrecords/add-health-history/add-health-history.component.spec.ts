import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHealthHistoryComponent } from './add-health-history.component';

describe('AddHealthHistoryComponent', () => {
  let component: AddHealthHistoryComponent;
  let fixture: ComponentFixture<AddHealthHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHealthHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHealthHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
