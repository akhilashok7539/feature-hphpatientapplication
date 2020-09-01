import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTimingAppoitmentsComponent } from './doc-timing-appoitments.component';

describe('DocTimingAppoitmentsComponent', () => {
  let component: DocTimingAppoitmentsComponent;
  let fixture: ComponentFixture<DocTimingAppoitmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocTimingAppoitmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTimingAppoitmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
