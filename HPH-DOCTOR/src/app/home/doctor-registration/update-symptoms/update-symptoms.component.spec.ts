import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSymptomsComponent } from './update-symptoms.component';

describe('UpdateSymptomsComponent', () => {
  let component: UpdateSymptomsComponent;
  let fixture: ComponentFixture<UpdateSymptomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSymptomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSymptomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
