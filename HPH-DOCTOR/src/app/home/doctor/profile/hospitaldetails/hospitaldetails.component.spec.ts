import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitaldetailsComponent } from './hospitaldetails.component';

describe('HospitaldetailsComponent', () => {
  let component: HospitaldetailsComponent;
  let fixture: ComponentFixture<HospitaldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitaldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitaldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
