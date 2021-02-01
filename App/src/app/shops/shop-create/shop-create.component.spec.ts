import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShopCreateComponent } from './shop-create.component';

describe('ShopCreateComponent', () => {
  let component: ShopCreateComponent;
  let fixture: ComponentFixture<ShopCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
