import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SignupPayload } from '../signup/signup-payload';
import { MustMatch } from '../../shared/mustMatch';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.css']
})
export class SignupAdminComponent implements OnInit {

  constructor(private authService: AuthService, private formbuilder: FormBuilder, private router: Router) { }

  signupForm: FormGroup;
  signupPayload: SignupPayload;
  datasaved: boolean;
  datanotsaved: boolean;

  ngOnInit(): void {
    this.logincheck();
    this.signupForm = this.formbuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      role: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern('[0][1-9][0-9]{8}')]],
      email: ['', [Validators.required, Validators.email]],
      addressLine1: ['', [Validators.required]],
      addressLine2: ['', [Validators.required]],
      addressLine3: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9])([a-zA-Z0-9*.!@#$%^&(){}|]+){6}$')]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get formControls() {
    return this.signupForm.controls;
  }

  clearForm() {
    this.signupForm.reset();
  }

  submitUserData() {

    this.datasaved = false;
    this.datanotsaved = false;
    this.signupPayload = this.signupForm.value;
    this.postData(this.signupPayload);
  }

  postData(newUser: SignupPayload) {
    this.authService.connectSignupApi(newUser).subscribe(status => {
      let signupStatus: any;
      signupStatus = status;

      if (signupStatus) {
        this.datasaved = signupStatus;
        this.signupForm.reset();
      }
      else {
        this.datanotsaved = true;
      }
    });
  }

  logincheck() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['home']);
    }
  }

}
