import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerRequestDetailsComponent } from './buyer-request-details.component';

describe('BuyerRequestDetailsComponent', () => {
  let component: BuyerRequestDetailsComponent;
  let fixture: ComponentFixture<BuyerRequestDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerRequestDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
