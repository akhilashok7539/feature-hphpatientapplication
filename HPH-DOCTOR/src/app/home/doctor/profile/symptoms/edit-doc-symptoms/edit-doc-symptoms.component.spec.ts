import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDocSymptomsComponent } from './edit-doc-symptoms.component';

describe('EditDocSymptomsComponent', () => {
  let component: EditDocSymptomsComponent;
  let fixture: ComponentFixture<EditDocSymptomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDocSymptomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDocSymptomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
