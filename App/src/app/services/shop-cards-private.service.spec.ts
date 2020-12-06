import { TestBed } from '@angular/core/testing';

import { ShopCardsPrivateService } from './shop-cards-private.service';

describe('ShopCardsPrivateService', () => {
  let service: ShopCardsPrivateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopCardsPrivateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
