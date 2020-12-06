import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCardsPublicComponent } from './shop-cards-public.component';

describe('ShopCardsPublicComponent', () => {
  let component: ShopCardsPublicComponent;
  let fixture: ComponentFixture<ShopCardsPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopCardsPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCardsPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
