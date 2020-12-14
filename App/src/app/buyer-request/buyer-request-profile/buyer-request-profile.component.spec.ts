import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerRequestProfileComponent } from './buyer-request-profile.component';

describe('BuyerRequestProfileComponent', () => {
  let component: BuyerRequestProfileComponent;
  let fixture: ComponentFixture<BuyerRequestProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerRequestProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerRequestProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
