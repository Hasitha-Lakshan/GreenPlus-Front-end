import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShopsHomeComponent } from './shops-home.component';

describe('ShopsHomeComponent', () => {
  let component: ShopsHomeComponent;
  let fixture: ComponentFixture<ShopsHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
