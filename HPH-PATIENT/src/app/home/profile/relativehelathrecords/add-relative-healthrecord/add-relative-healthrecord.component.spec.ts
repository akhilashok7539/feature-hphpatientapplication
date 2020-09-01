import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRelativeHealthrecordComponent } from './add-relative-healthrecord.component';

describe('AddRelativeHealthrecordComponent', () => {
  let component: AddRelativeHealthrecordComponent;
  let fixture: ComponentFixture<AddRelativeHealthrecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRelativeHealthrecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRelativeHealthrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
