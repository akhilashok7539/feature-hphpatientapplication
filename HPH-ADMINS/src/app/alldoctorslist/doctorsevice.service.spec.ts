import { TestBed } from '@angular/core/testing';

import { DoctorseviceService } from './doctorsevice.service';

describe('DoctorseviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoctorseviceService = TestBed.get(DoctorseviceService);
    expect(service).toBeTruthy();
  });
});
