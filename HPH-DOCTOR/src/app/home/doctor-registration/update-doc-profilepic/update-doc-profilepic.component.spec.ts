import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDocProfilepicComponent } from './update-doc-profilepic.component';

describe('UpdateDocProfilepicComponent', () => {
  let component: UpdateDocProfilepicComponent;
  let fixture: ComponentFixture<UpdateDocProfilepicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDocProfilepicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDocProfilepicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
