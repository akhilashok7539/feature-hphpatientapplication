import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCommandcenterComponent } from './view-commandcenter.component';

describe('ViewCommandcenterComponent', () => {
  let component: ViewCommandcenterComponent;
  let fixture: ComponentFixture<ViewCommandcenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCommandcenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCommandcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
