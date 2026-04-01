import { TestBed } from '@angular/core/testing';

import { IconCacheService } from './icon-cache.service';

describe('IconCacheService', () => {
  let service: IconCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IconCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
