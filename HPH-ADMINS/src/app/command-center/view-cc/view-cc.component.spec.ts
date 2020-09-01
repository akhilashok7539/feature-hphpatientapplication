import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCcComponent } from './view-cc.component';

describe('ViewCcComponent', () => {
  let component: ViewCcComponent;
  let fixture: ComponentFixture<ViewCcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
