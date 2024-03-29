import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SignupAdminComponent } from './signup-admin.component';

describe('SignupAdminComponent', () => {
  let component: SignupAdminComponent;
  let fixture: ComponentFixture<SignupAdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
