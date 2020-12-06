import { TestBed } from '@angular/core/testing';

import { ShopsPrivateService } from './shops-private.service';

describe('ShopsPrivateService', () => {
  let service: ShopsPrivateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopsPrivateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
