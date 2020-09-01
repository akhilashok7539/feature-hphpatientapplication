import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpinfraComponent } from './ipinfra.component';

describe('IpinfraComponent', () => {
  let component: IpinfraComponent;
  let fixture: ComponentFixture<IpinfraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpinfraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpinfraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
