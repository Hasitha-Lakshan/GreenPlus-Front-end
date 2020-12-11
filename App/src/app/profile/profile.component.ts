import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
import { UserPublic } from './user-public';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isValidateUser: boolean;
  isValidateUserRole: boolean;
  url: string;
  usernameFromUrl: string;
  userPublic: UserPublic;

  constructor(private profileService: ProfileService, private authService: AuthService, private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.getUserDetailsPublic();

  }

  getUsernameFromUrl() {
    this.url = this.router.url;
    this.usernameFromUrl = this.url.slice(9, this.url.length);
    return this.usernameFromUrl;
  }

  getUserDetailsPublic() {

    this.getUsernameFromUrl();
    this.profileService.connectUserDetailsPublicApi(this.usernameFromUrl).subscribe((data) => {

      if (data != null) {
        this.userPublic = data;
        this.validateUserByUserIds(data.userId);
        this.validateUserByUserRole(data.role, data.userId);

      } else {
        this.router.navigate(['error']);
      }

    },
      error => {
        this.router.navigate(['error']);
      });
  }

  private validateUserByUserIds(userIdByUsernameFromUrl: number) {
    this.profileService.connectUserDetailsPublicApi(this.localStorageService.retrieve('username')).subscribe((data) => {

      if (this.authService.isAuthenticated() && (userIdByUsernameFromUrl == data.userId)) {
        this.isValidateUser = true;

      } else {
        this.isValidateUser = false;
      }
    })
  }

  validateUserByUserRole(userRoleByUsernameFromUrl: string, userIdByUsernameFromUrl: number) {

    this.profileService.connectUserDetailsPublicApi(this.localStorageService.retrieve('username')).subscribe((data) => {

      if (this.authService.isAuthenticated() && (userRoleByUsernameFromUrl === "ADMIN") && !(data.userId === userIdByUsernameFromUrl)) {
        this.router.navigate(['error']);
      }
      if (this.authService.isAuthenticated() && (userRoleByUsernameFromUrl == "BUYER") && !(data.userId === userIdByUsernameFromUrl)) {

        if (!(this.localStorageService.retrieve('role') == "ADMIN")) {
          this.router.navigate(['error']);
        }
      }
    })
  }

}
