import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIdProofComponent } from './add-id-proof.component';

describe('AddIdProofComponent', () => {
  let component: AddIdProofComponent;
  let fixture: ComponentFixture<AddIdProofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIdProofComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIdProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
