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
  url: string;
  usernameFromUrl: string;
  usernameFromLocalStorage: string;
  userPublic: UserPublic;


  constructor(private profileService: ProfileService, private authService: AuthService, private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.validateUser();
    this.getUserDetailsPublic();
  }

  validateUser() {
    this.url = this.router.url;
    this.usernameFromUrl = this.url.slice(9, this.url.length);
    this.usernameFromLocalStorage = this.localStorageService.retrieve('username');

    if (this.usernameFromUrl == this.usernameFromLocalStorage && this.authService.isAuthenticated()) {
      this.isValidateUser = true;
    } else {
      this.isValidateUser = false;
    }
  }

  getUserDetailsPublic() {

    this.profileService.connectUserDetailsPublicApi(this.usernameFromUrl).subscribe((data) => {

      if (data != null) {
        this.userPublic = data;
        this.validateUserRole(data.role);

      } else {
        this.router.navigate(['error']);
      }

    },
      error => {
        this.router.navigate(['error']);
      });
  }


  validateUserRole(userRole: string) {

    if ((userRole == "ADMIN" && !this.isValidateUser)) {
      this.router.navigate(['error']);
    }

    if ((userRole == "BUYER" && !this.isValidateUser)) {

      if (!(this.localStorageService.retrieve('role') == "ADMIN")) {  // Better to validate data from database instead oof local storage
        this.router.navigate(['error']);
      }
    }
  }

}
