import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarBuyerRequestsComponent } from './search-bar-buyer-requests.component';

describe('SearchBarBuyerRequestsComponent', () => {
  let component: SearchBarBuyerRequestsComponent;
  let fixture: ComponentFixture<SearchBarBuyerRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarBuyerRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarBuyerRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
