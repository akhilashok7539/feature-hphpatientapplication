import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDetialsComponent } from './personal-detials.component';

describe('PersonalDetialsComponent', () => {
  let component: PersonalDetialsComponent;
  let fixture: ComponentFixture<PersonalDetialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalDetialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
