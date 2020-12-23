import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service'
import { ResponsePayload } from '../../shared/response-payload';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  isAccountNotDeactivated: boolean;

  constructor(private userService: UserService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.checkUserValidation();
  }

  //Slice the current url and get the username
  getUsernameFromUrl(): string {
    return this.router.url.slice(6, (this.router.url.length - 9));
  }


  checkUserValidation() {
    if (!this.authService.validateUserByUsernameFromUrlAndLocalStorageUsingUserId(this.getUsernameFromUrl())) {
      this.router.navigate(['error']);
    }
  }

  deactivateAccount() {
    this.userService.connectDeactivateAccountApi(this.getUsernameFromUrl()).subscribe((response) => {

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
