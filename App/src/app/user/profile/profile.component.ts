import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { UserProfile } from './user-profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isValidateUser: boolean;
  userProfile: UserProfile;
  isAvailableProfilePicture: boolean;
  isAvailableNotProfilePicture: boolean;
  profilePicture: any;

  constructor(private userService: UserService, private authService: AuthService, private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.isSameUser();
    this.getUserDetailsPublic();
    this.isAvailableNotProfilePicture = true;
    this.getProfilePicture();
  }

  //Slice the current url and get the username
  getUsernameFromUrl(): string {

    if (this.router.url.endsWith('/profile')) {
      return this.router.url.slice(6, (this.router.url.length - 8));

    } else {
      return this.router.url.slice(6, this.router.url.length);
    }
  }

  //Connect the user details-publiic api and fetching the data from database using the username from url. Using the subscribe(), assigning user data to userProfile varialbe
  getUserDetailsPublic() {
    this.userService.connectUserDetailsPublicApi(this.getUsernameFromUrl()).subscribe((data) => {

      if (data != null) {
        this.userProfile = data;
        this.validateUser(data.role);

      } else {
        this.router.navigate(['error']);
      }

    },
      error => {
        this.router.navigate(['error']);
      });
  }

  private isSameUser() {
    if (this.authService.validateUserByUsernameFromUrlAndUsernameFromLocalStorage(this.getUsernameFromUrl())) {
      this.isValidateUser = true;

    } else {
      this.isValidateUser = false;
    }
  }

  //Validate user's Id and the user's role using the username from the url and the username from the local-storage
  private validateUser(userRole: string) {

    if ((userRole === "ADMIN") && !this.isValidateUser) {
      this.router.navigate(['error']);
    }
    if ((userRole == "BUYER") && !this.isValidateUser) {

      if (!(this.localStorageService.retrieve('role') == "ADMIN")) {
        this.router.navigate(['error']);
      }
    }

    if (!this.authService.isAuthenticated() && (userRole == "BUYER")) {
      this.router.navigate(['error']);
    }

    if (!this.authService.isAuthenticated() && (userRole === "ADMIN")) {
      this.router.navigate(['error']);
    }

    //Only the user can access the router, profile
    if (this.router.url.endsWith('/profile')) {
      if (!this.isValidateUser) {
        this.router.navigate(['error']);
      }
    }
  }

  // Get the profile picture from the database
  getProfilePicture() {
    this.userService.connectGetProfilePictureApi(this.getUsernameFromUrl()).subscribe(response => {

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

}
