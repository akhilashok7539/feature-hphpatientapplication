import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhonenumberVerifyComponent } from './edit-phonenumber-verify.component';

describe('EditPhonenumberVerifyComponent', () => {
  let component: EditPhonenumberVerifyComponent;
  let fixture: ComponentFixture<EditPhonenumberVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPhonenumberVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhonenumberVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
