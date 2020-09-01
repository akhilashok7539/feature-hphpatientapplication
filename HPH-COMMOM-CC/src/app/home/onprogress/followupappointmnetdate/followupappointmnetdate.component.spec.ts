import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowupappointmnetdateComponent } from './followupappointmnetdate.component';

describe('FollowupappointmnetdateComponent', () => {
  let component: FollowupappointmnetdateComponent;
  let fixture: ComponentFixture<FollowupappointmnetdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowupappointmnetdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowupappointmnetdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
