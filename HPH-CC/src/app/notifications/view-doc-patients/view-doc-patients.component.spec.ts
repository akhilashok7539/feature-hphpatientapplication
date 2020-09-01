import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDocPatientsComponent } from './view-doc-patients.component';

describe('ViewDocPatientsComponent', () => {
  let component: ViewDocPatientsComponent;
  let fixture: ComponentFixture<ViewDocPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDocPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDocPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
