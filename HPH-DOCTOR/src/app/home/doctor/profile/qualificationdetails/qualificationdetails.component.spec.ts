import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationdetailsComponent } from './qualificationdetails.component';

describe('QualificationdetailsComponent', () => {
  let component: QualificationdetailsComponent;
  let fixture: ComponentFixture<QualificationdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualificationdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificationdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
