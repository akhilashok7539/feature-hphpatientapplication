import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommandcenterComponent } from './edit-commandcenter.component';

describe('EditCommandcenterComponent', () => {
  let component: EditCommandcenterComponent;
  let fixture: ComponentFixture<EditCommandcenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCommandcenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommandcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
