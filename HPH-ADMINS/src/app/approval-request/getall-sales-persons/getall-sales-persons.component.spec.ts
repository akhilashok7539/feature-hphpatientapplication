import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallSalesPersonsComponent } from './getall-sales-persons.component';

describe('GetallSalesPersonsComponent', () => {
  let component: GetallSalesPersonsComponent;
  let fixture: ComponentFixture<GetallSalesPersonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetallSalesPersonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetallSalesPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
