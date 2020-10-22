import { TestBed } from '@angular/core/testing';

import { BranchOfficerserviceService } from './branch-officerservice.service';

describe('BranchOfficerserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BranchOfficerserviceService = TestBed.get(BranchOfficerserviceService);
    expect(service).toBeTruthy();
  });
});
