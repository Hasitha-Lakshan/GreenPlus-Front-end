import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerRequestListComponent } from './buyer-request-list.component';

describe('BuyerRequestListComponent', () => {
  let component: BuyerRequestListComponent;
  let fixture: ComponentFixture<BuyerRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
