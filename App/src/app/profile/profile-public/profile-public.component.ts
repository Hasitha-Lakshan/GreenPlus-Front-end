import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { UserProfile } from './user-profile';

@Component({
  selector: 'app-profile-public',
  templateUrl: './profile-public.component.html',
  styleUrls: ['./profile-public.component.css']
})
export class ProfilePublicComponent implements OnInit {

  isValidateUser: boolean;
  userProfile: UserProfile;

  constructor(private profileService: ProfileService, private authService: AuthService, private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.getUserDetailsPublic();
  }

  //Slice the current url and get the username
  getUsernameFromUrl(): string {
    return this.router.url.slice(6, this.router.url.length);
  }

  //Connect the user details-publiic api and fetching the data from database using the username from url. Using the subscribe(), assigning user data to userProfile varialbe
  getUserDetailsPublic() {
    this.profileService.connectUserDetailsPublicApi(this.getUsernameFromUrl()).subscribe((data) => {

      if (data != null) {
        this.userProfile = data;
        this.validateUser(data.userId, data.role);

      } else {
        this.router.navigate(['error']);
      }

    },
      error => {
        this.router.navigate(['error']);
      });
  }

  //Validate user's Id and the user's role using the username from the url and the username from the local-storage
  private validateUser(userIdByUsernameFromUrl: number, userRoleByUsernameFromUrl: string) {
    this.profileService.connectUserDetailsPublicApi(this.localStorageService.retrieve('username')).subscribe((data) => {

      if (this.authService.isAuthenticated() && (userIdByUsernameFromUrl === data.userId)) {
        this.isValidateUser = true;

      } else {
        this.isValidateUser = false;
      }

      if (this.authService.isAuthenticated() && (userRoleByUsernameFromUrl === "ADMIN") && !(data.userId === userIdByUsernameFromUrl)) {
        this.router.navigate(['error']);
      }
      if (this.authService.isAuthenticated() && (userRoleByUsernameFromUrl == "BUYER") && !(data.userId === userIdByUsernameFromUrl)) {

        if (!(this.localStorageService.retrieve('role') == "ADMIN")) {
          this.router.navigate(['error']);
        }
      }

      if (!this.authService.isAuthenticated() && (userRoleByUsernameFromUrl == "BUYER")) {
        this.router.navigate(['error']);
      }

      if (!this.authService.isAuthenticated() && (userRoleByUsernameFromUrl === "ADMIN")) {
        this.router.navigate(['error']);
      }

    })
  }

}
