import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDoctorsListComponent } from './pending-doctors-list.component';

describe('PendingDoctorsListComponent', () => {
  let component: PendingDoctorsListComponent;
  let fixture: ComponentFixture<PendingDoctorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingDoctorsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingDoctorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
