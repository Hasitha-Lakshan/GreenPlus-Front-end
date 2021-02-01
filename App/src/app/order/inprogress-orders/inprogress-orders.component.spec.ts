import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InprogressOrdersComponent } from './inprogress-orders.component';

describe('InprogressOrdersComponent', () => {
  let component: InprogressOrdersComponent;
  let fixture: ComponentFixture<InprogressOrdersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InprogressOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InprogressOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
