import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteProfileViewComponent } from './complete-profile-view.component';

describe('CompleteProfileViewComponent', () => {
  let component: CompleteProfileViewComponent;
  let fixture: ComponentFixture<CompleteProfileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteProfileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
