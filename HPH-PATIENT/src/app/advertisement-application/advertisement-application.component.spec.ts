import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementApplicationComponent } from './advertisement-application.component';

describe('AdvertisementApplicationComponent', () => {
  let component: AdvertisementApplicationComponent;
  let fixture: ComponentFixture<AdvertisementApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertisementApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
