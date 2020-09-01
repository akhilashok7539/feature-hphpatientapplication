import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcarSectionComponent } from './healthcar-section.component';

describe('HealthcarSectionComponent', () => {
  let component: HealthcarSectionComponent;
  let fixture: ComponentFixture<HealthcarSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthcarSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcarSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
