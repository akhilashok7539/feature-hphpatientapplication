import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCcComponent } from './add-cc.component';

describe('AddCcComponent', () => {
  let component: AddCcComponent;
  let fixture: ComponentFixture<AddCcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
