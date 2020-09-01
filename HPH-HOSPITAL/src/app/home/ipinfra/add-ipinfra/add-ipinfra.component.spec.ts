import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIpinfraComponent } from './add-ipinfra.component';

describe('AddIpinfraComponent', () => {
  let component: AddIpinfraComponent;
  let fixture: ComponentFixture<AddIpinfraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIpinfraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIpinfraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
