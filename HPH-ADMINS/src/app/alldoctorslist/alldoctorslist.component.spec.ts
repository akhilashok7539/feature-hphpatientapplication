import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlldoctorslistComponent } from './alldoctorslist.component';

describe('AlldoctorslistComponent', () => {
  let component: AlldoctorslistComponent;
  let fixture: ComponentFixture<AlldoctorslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlldoctorslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlldoctorslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
