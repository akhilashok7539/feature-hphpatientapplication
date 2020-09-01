import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseIpInfraComponent } from './choose-ip-infra.component';

describe('ChooseIpInfraComponent', () => {
  let component: ChooseIpInfraComponent;
  let fixture: ComponentFixture<ChooseIpInfraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseIpInfraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseIpInfraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
