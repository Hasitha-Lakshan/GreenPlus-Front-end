import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserDetailsUpdateComponent } from './user-details-update.component';

describe('UserDetailsUpdateComponent', () => {
  let component: UserDetailsUpdateComponent;
  let fixture: ComponentFixture<UserDetailsUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
