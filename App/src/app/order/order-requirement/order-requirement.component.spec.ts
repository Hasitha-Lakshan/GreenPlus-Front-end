import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRequirementComponent } from './order-requirement.component';

describe('OrderRequirementComponent', () => {
  let component: OrderRequirementComponent;
  let fixture: ComponentFixture<OrderRequirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderRequirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
