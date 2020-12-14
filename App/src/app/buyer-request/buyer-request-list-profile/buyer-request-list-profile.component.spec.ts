import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerRequestListProfileComponent } from './buyer-request-list-profile.component';

describe('BuyerRequestListProfileComponent', () => {
  let component: BuyerRequestListProfileComponent;
  let fixture: ComponentFixture<BuyerRequestListProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerRequestListProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerRequestListProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
