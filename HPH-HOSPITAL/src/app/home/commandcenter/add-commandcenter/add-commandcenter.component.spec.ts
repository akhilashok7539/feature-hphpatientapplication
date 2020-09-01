import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommandcenterComponent } from './add-commandcenter.component';

describe('AddCommandcenterComponent', () => {
  let component: AddCommandcenterComponent;
  let fixture: ComponentFixture<AddCommandcenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCommandcenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommandcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
