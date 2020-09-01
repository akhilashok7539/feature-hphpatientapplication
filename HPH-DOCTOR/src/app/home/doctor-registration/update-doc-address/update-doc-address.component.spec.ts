import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDocAddressComponent } from './update-doc-address.component';

describe('UpdateDocAddressComponent', () => {
  let component: UpdateDocAddressComponent;
  let fixture: ComponentFixture<UpdateDocAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDocAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDocAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
