import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelativehelathrecordsComponent } from './relativehelathrecords.component';

describe('RelativehelathrecordsComponent', () => {
  let component: RelativehelathrecordsComponent;
  let fixture: ComponentFixture<RelativehelathrecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelativehelathrecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelativehelathrecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
