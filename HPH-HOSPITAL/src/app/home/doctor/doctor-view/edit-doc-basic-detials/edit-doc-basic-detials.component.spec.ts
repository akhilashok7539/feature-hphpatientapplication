import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDocBasicDetialsComponent } from './edit-doc-basic-detials.component';

describe('EditDocBasicDetialsComponent', () => {
  let component: EditDocBasicDetialsComponent;
  let fixture: ComponentFixture<EditDocBasicDetialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDocBasicDetialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDocBasicDetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
