import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarBuyerRequestComponent } from './search-bar-buyer-request.component';

describe('SearchBarBuyerRequestComponent', () => {
  let component: SearchBarBuyerRequestComponent;
  let fixture: ComponentFixture<SearchBarBuyerRequestComponent>;

  beforeEach(async(() => {
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
