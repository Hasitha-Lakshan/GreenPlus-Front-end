import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InprogressOrdersComponent } from './inprogress-orders.component';

describe('InprogressOrdersComponent', () => {
  let component: InprogressOrdersComponent;
  let fixture: ComponentFixture<InprogressOrdersComponent>;

  beforeEach(async(() => {
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
