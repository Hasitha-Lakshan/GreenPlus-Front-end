import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusBarComponent } from './order-status-bar.component';

describe('OrderStatusBarComponent', () => {
  let component: OrderStatusBarComponent;
  let fixture: ComponentFixture<OrderStatusBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStatusBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
