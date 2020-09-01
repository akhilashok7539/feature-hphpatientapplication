import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRegistrationProofComponent } from './edit-registration-proof.component';

describe('EditRegistrationProofComponent', () => {
  let component: EditRegistrationProofComponent;
  let fixture: ComponentFixture<EditRegistrationProofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRegistrationProofComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRegistrationProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
