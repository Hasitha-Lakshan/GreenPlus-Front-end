import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsHomeComponent } from './shops-home.component';

describe('ShopsHomeComponent', () => {
  let component: ShopsHomeComponent;
  let fixture: ComponentFixture<ShopsHomeComponent>;

  beforeEach(async(() => {
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
