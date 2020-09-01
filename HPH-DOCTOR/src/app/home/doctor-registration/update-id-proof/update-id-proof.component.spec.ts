import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIdProofComponent } from './update-id-proof.component';

describe('UpdateIdProofComponent', () => {
  let component: UpdateIdProofComponent;
  let fixture: ComponentFixture<UpdateIdProofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateIdProofComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateIdProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
