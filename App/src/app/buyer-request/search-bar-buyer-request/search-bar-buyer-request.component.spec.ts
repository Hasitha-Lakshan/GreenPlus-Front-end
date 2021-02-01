import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchBarBuyerRequestComponent } from './search-bar-buyer-request.component';

describe('SearchBarBuyerRequestComponent', () => {
  let component: SearchBarBuyerRequestComponent;
  let fixture: ComponentFixture<SearchBarBuyerRequestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarBuyerRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarBuyerRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
