import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomsUpdateComponent } from './symptoms-update.component';

describe('SymptomsUpdateComponent', () => {
  let component: SymptomsUpdateComponent;
  let fixture: ComponentFixture<SymptomsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymptomsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymptomsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
