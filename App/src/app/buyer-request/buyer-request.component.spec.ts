import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuyerRequestComponent } from './buyer-request.component';

describe('BuyerRequestComponent', () => {
  let component: BuyerRequestComponent;
  let fixture: ComponentFixture<BuyerRequestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
