import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSymptomsComponent } from './edit-symptoms.component';

describe('EditSymptomsComponent', () => {
  let component: EditSymptomsComponent;
  let fixture: ComponentFixture<EditSymptomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSymptomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSymptomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
