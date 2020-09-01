import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQualificationDetailsComponent } from './edit-qualification-details.component';

describe('EditQualificationDetailsComponent', () => {
  let component: EditQualificationDetailsComponent;
  let fixture: ComponentFixture<EditQualificationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditQualificationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQualificationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
