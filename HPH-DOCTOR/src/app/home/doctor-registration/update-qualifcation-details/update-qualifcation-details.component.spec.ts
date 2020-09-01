import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQualifcationDetailsComponent } from './update-qualifcation-details.component';

describe('UpdateQualifcationDetailsComponent', () => {
  let component: UpdateQualifcationDetailsComponent;
  let fixture: ComponentFixture<UpdateQualifcationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateQualifcationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateQualifcationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
