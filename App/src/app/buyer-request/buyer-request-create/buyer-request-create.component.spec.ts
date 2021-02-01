import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuyerRequestCreateComponent } from './buyer-request-create.component';

describe('BuyerRequestCreateComponent', () => {
  let component: BuyerRequestCreateComponent;
  let fixture: ComponentFixture<BuyerRequestCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerRequestCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerRequestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
