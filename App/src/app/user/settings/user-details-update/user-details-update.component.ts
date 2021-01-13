import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { UserDetailsGetPayload } from './user-details-get-payload';
import { UserDetailsUpdatePayload } from './user-details-update-payload';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ResponsePayload } from 'src/app/shared/response-payload';
import { MustMatch } from '../../../shared/mustMatch';

@Component({
  selector: 'app-user-details-update',
  templateUrl: './user-details-update.component.html',
  styleUrls: ['./user-details-update.component.css']
})
export class UserDetailsUpdateComponent implements OnInit {

  userForm: FormGroup;
  userDetailsGetPayload: UserDetailsGetPayload;
  userDetailsUpdatePayload: UserDetailsUpdatePayload;
  datasaved: boolean;
  datanotsaved: boolean;
  username: string;
  isAvailableMobileNumber: boolean;
  passwordForm: FormGroup;

  constructor(private userService: UserService, private authService: AuthService, private formbuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.userForm = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      username: [''],
      role: [''],
      mobileNumber: [''],
      email: [''],
      addressLine1: [''],
      addressLine2: [''],
      addressLine3: ['']
    });

    this.passwordForm = this.formbuilder.group({
      password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9])([a-zA-Z0-9*.!@#$%^&(){}|]+){6}$')]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    })

    this.getUsernameFromUrl();
    this.checkUserValidation();
    this.getUserDetails();
  }

  get formControls() {
    return this.userForm.controls;
  }

  //Slice the current url and get the username
  private getUsernameFromUrl() {
    this.username = this.router.url.slice(6, (this.router.url.length - 29));
  }

  checkUserValidation() {
    if (!this.authService.validateUserByUsernameFromUrlAndUsernameFromLocalStorage(this.username)) {
      this.router.navigate(['error']);
    }
  }

  getUserDetails() {
    this.userService.connectUserDetailsByUsernamedApi(this.username).subscribe((data) => {

      if (data != null) {
        this.userDetailsGetPayload = data;
        this.userForm = new FormGroup({
          firstName: new FormControl(this.userDetailsGetPayload.firstName, [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')]),
          lastName: new FormControl(this.userDetailsGetPayload.lastName, [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')]),
          username: new FormControl(this.userDetailsGetPayload.username, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
          role: new FormControl(this.userDetailsGetPayload.role),
          mobileNumber: new FormControl(this.userDetailsGetPayload.mobileNumber, [Validators.required, Validators.pattern('[1-9][0-9]{8}')]),
          email: new FormControl(this.userDetailsGetPayload.email, [Validators.required, Validators.email, Validators.maxLength(50)]),
          addressLine1: new FormControl(this.userDetailsGetPayload.addressLine1, [Validators.required, Validators.maxLength(25)]),
          addressLine2: new FormControl(this.userDetailsGetPayload.addressLine2, [Validators.required, Validators.maxLength(25)]),
          addressLine3: new FormControl(this.userDetailsGetPayload.addressLine3, [Validators.required, Validators.maxLength(25)])
        });

      } else {
        this.router.navigate(['error']);
      }

    },
      error => {
        this.router.navigate(['error']);
      });
  }

  getPassword() {
    this.userDetailsUpdatePayload.password = this.passwordForm.value.password;
    this.putUserData(this.userDetailsUpdatePayload);
  }

  get formControlsOfPasswordFrom() {
    return this.passwordForm.controls;
  }

  updateUserData() {
    this.datasaved = false;
    this.datanotsaved = false;
    this.userDetailsUpdatePayload = this.userForm.value;
  }

  putUserData(userDetailsUpdatePayloadData: UserDetailsUpdatePayload) {
    this.userService.connectUserUpdateApi(this.username, userDetailsUpdatePayloadData).subscribe(response => {
      let userDetailsUpdatingResponse: ResponsePayload;
      userDetailsUpdatingResponse = response;

      if (userDetailsUpdatingResponse.responseStatus) {
        this.datasaved = userDetailsUpdatingResponse.responseStatus;
        this.isAvailableMobileNumber = false;
        this.ngOnInit();
      }
      else {
        if (userDetailsUpdatingResponse.responseBody.includes("The mobile number is already using by another user, User details update is failed!")) {
          this.isAvailableMobileNumber = true;
        }

        this.datanotsaved = true;
      }
    },
      error => {
        this.datanotsaved = true;
      });
  }
}
