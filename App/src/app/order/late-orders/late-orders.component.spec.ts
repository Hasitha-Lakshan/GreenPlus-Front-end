import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LateOrdersComponent } from './late-orders.component';

describe('LateOrdersComponent', () => {
  let component: LateOrdersComponent;
  let fixture: ComponentFixture<LateOrdersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LateOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LateOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
