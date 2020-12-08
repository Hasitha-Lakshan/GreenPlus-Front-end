import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsProfileComponent } from './shops-profile.component';

describe('ShopsProfileComponent', () => {
  let component: ShopsProfileComponent;
  let fixture: ComponentFixture<ShopsProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopsProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
