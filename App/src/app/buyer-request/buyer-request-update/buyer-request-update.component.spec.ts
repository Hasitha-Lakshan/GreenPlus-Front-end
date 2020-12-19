import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerRequestUpdateComponent } from './buyer-request-update.component';

describe('BuyerRequestUpdateComponent', () => {
  let component: BuyerRequestUpdateComponent;
  let fixture: ComponentFixture<BuyerRequestUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerRequestUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerRequestUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
