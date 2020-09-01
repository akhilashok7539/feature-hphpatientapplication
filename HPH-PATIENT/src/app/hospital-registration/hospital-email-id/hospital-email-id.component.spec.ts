import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalEmailIdComponent } from './hospital-email-id.component';

describe('HospitalEmailIdComponent', () => {
  let component: HospitalEmailIdComponent;
  let fixture: ComponentFixture<HospitalEmailIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalEmailIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalEmailIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
