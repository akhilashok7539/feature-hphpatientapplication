import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHospitallogoComponent } from './edit-hospitallogo.component';

describe('EditHospitallogoComponent', () => {
  let component: EditHospitallogoComponent;
  let fixture: ComponentFixture<EditHospitallogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHospitallogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHospitallogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
