import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCcPassComponent } from './edit-cc-pass.component';

describe('EditCcPassComponent', () => {
  let component: EditCcPassComponent;
  let fixture: ComponentFixture<EditCcPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCcPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCcPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
