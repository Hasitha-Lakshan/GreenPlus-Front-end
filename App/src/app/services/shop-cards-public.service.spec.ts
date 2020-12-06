import { TestBed } from '@angular/core/testing';

import { ShopCardsPublicService } from './shop-cards-public.service';

describe('ShopCardsPublicService', () => {
  let service: ShopCardsPublicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopCardsPublicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
