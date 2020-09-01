import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewallCcHospitalComponent } from './viewall-cc-hospital.component';

describe('ViewallCcHospitalComponent', () => {
  let component: ViewallCcHospitalComponent;
  let fixture: ComponentFixture<ViewallCcHospitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewallCcHospitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewallCcHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
