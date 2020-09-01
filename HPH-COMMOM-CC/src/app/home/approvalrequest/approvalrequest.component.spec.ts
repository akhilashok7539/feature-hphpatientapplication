import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalrequestComponent } from './approvalrequest.component';

describe('ApprovalrequestComponent', () => {
  let component: ApprovalrequestComponent;
  let fixture: ComponentFixture<ApprovalrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
