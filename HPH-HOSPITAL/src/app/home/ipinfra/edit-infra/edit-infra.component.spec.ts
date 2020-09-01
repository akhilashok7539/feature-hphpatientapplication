import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInfraComponent } from './edit-infra.component';

describe('EditInfraComponent', () => {
  let component: EditInfraComponent;
  let fixture: ComponentFixture<EditInfraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInfraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInfraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
