import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandcenterComponent } from './commandcenter.component';

describe('CommandcenterComponent', () => {
  let component: CommandcenterComponent;
  let fixture: ComponentFixture<CommandcenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandcenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
