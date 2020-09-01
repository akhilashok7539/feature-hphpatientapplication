import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnprogressComponent } from './onprogress.component';

describe('OnprogressComponent', () => {
  let component: OnprogressComponent;
  let fixture: ComponentFixture<OnprogressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnprogressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
