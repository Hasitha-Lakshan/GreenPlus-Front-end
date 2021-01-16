import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SignupPayload } from './signup-payload';
import { MustMatch } from '../../shared/mustMatch';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  signupPayload: SignupPayload;
  datasaved: boolean;
  datanotsaved: boolean;
  responseMessage: string;

  constructor(private authService: AuthService, private formbuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.logincheck();
    this.signupForm = this.formbuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')]],
      lastName: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')]],
      role: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern('[0][1-9][0-9]{8}')]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      addressLine1: ['', [Validators.required, Validators.maxLength(25)]],
      addressLine2: ['', [Validators.required, Validators.maxLength(25)]],
      addressLine3: ['', [Validators.required, Validators.maxLength(25)]],
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
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
    this.signupPayload.username = this.signupPayload.username.toLowerCase();
    this.postData(this.signupPayload);
  }

  postData(newUser: SignupPayload) {
    this.authService.connectSignupApi(newUser).subscribe(response => {
      const signupResponse = response;

      if (signupResponse.responseStatus) {
        this.datasaved = signupResponse.responseStatus;
        this.datanotsaved = !signupResponse.responseStatus;
        this.signupForm.reset();
      }
      else {
        this.responseMessage = signupResponse.responseBody;
        this.datanotsaved = !signupResponse.responseStatus;
        this.datasaved = signupResponse.responseStatus;
      }
    });
  }

  logincheck() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['home']);
    }
  }

}
