import { TestBed } from '@angular/core/testing';

import { CommandcenterService } from './commandcenter.service';

describe('CommandcenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommandcenterService = TestBed.get(CommandcenterService);
    expect(service).toBeTruthy();
  });
});
