import { TestBed } from '@angular/core/testing';

import { ShopsPublicService } from './shops-public.service';

describe('ShopsPublicService', () => {
  let service: ShopsPublicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopsPublicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
