import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutusSectionComponent } from './aboutus-section.component';

describe('AboutusSectionComponent', () => {
  let component: AboutusSectionComponent;
  let fixture: ComponentFixture<AboutusSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutusSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutusSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
