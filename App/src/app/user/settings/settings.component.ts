import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service'
import { ResponsePayload } from '../../shared/response-payload';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordPayload } from './reset-password-payload';
import { MustMatch } from '../../shared/mustMatch';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  isAccountNotDeactivated: boolean;
  isPasswordNotReset: boolean;
  isPasswordReset: boolean;
  resetPasswordForm: FormGroup;
  resetPasswordPayload: ResetPasswordPayload;
  username: string;
  setProfilePictureForm: FormGroup;
  profilePictureFromUser: File;
  isProfilePictureSet: boolean;
  isProfileNotPictureSet: boolean;
  isAvailableProfilePicture: boolean;
  isAvailableNotProfilePicture: boolean;
  profilePicture: any;

  constructor(private userService: UserService, private router: Router, private authService: AuthService, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getUsernameFromUrl();
    this.checkUserValidation();

    this.resetPasswordForm = this.formbuilder.group({
      oldPassword: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9])([a-zA-Z0-9*.!@#$%^&(){}|]+){6}$')]],
      userNewPassword: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9])([a-zA-Z0-9*.!@#$%^&(){}|]+){6}$')]],
      userNewconfirmPassword: ['', [Validators.required]]
    }, {
      validator: MustMatch('userNewPassword', 'userNewconfirmPassword')
    });

    this.setProfilePictureForm = this.formbuilder.group({
      profilePicture: ['', [Validators.required]]
    });

    this.isAvailableNotProfilePicture = true;
    this.getProfilePicture();
  }

  getProfilePictureDataFromUser(event: any) {
    this.profilePictureFromUser = event.target.files[0];
  }

  uploadProfilePicture() {

    const profilePictureData = new FormData();
    profilePictureData.append('profilePicture', this.profilePictureFromUser, this.profilePictureFromUser.name);

    this.userService.connectSetProfilePictureApi(profilePictureData, this.username).subscribe(response => {

      let setProfilePictureResponse: ResponsePayload;
      setProfilePictureResponse = response;

      if (setProfilePictureResponse.responseStatus) {
        this.isProfilePictureSet = setProfilePictureResponse.responseStatus;
        this.isProfileNotPictureSet = !setProfilePictureResponse.responseStatus;
        this.clearSetProfilePictureForm();
        this.ngOnInit();

      } else {
        this.isProfileNotPictureSet = !setProfilePictureResponse.responseStatus;
        this.isProfilePictureSet = setProfilePictureResponse.responseStatus;
      }
    },
      error => {
        this.isProfileNotPictureSet = true;
        this.isProfilePictureSet = false;
      });
  }

  clearSetProfilePictureForm() {
    this.setProfilePictureForm.reset();
  }

  getProfilePicture() {
    this.userService.connectGetProfilePictureApi(this.username).subscribe(response => {

      if (response != null) {
        this.profilePicture = 'data:image/jpeg;base64,' + response.pictureBytes;
        this.isAvailableNotProfilePicture = false;
        this.isAvailableProfilePicture = true;

      } else {
        this.isAvailableNotProfilePicture = true;
      }
    },
      error => {
        this.isAvailableNotProfilePicture = true;
      });
  }

  get formControls() {
    return this.resetPasswordForm.controls;
  }

  submitResetPasswordData() {
    this.resetPasswordPayload = this.resetPasswordForm.value;
    this.postData(this.resetPasswordPayload);
  }

  postData(resetPasswordPayloadData: ResetPasswordPayload) {
    this.userService.connectResetPasswordnApi(this.username, resetPasswordPayloadData).subscribe(response => {

      let resetPasswordResponse: ResponsePayload;
      resetPasswordResponse = response;

      if (resetPasswordResponse.responseStatus) {
        this.isPasswordReset = resetPasswordResponse.responseStatus;
        this.clearForm();

      } else {
        this.isPasswordNotReset = true;
      }
    },
      error => {
        this.isPasswordNotReset = true;
      });
  }

  clearForm() {
    this.resetPasswordForm.reset();
  }

  reLogin() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  //Slice the current url and get the username
  getUsernameFromUrl() {
    this.username = this.router.url.slice(6, (this.router.url.length - 9));
  }

  checkUserValidation() {
    if (!this.authService.validateUserByUsernameFromUrlAndLocalStorageUsingUserId(this.username)) {
      this.router.navigate(['error']);
    }
  }

  deactivateAccount() {
    this.userService.connectDeactivateAccountApi(this.username).subscribe((response) => {

      let deactivatingAccountResponse: ResponsePayload;
      deactivatingAccountResponse = response;

      if (deactivatingAccountResponse.responseStatus) {
        this.authService.logout();
        this.router.navigate(['home']);

      } else {

        this.isAccountNotDeactivated = true;
      }
    },
      error => {
        this.isAccountNotDeactivated = true;
      });
  }

}
