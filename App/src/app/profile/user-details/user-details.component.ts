import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  isValidateUser: boolean;
  url: string;
  usernameFromUrl: string;
  usernameFromLocalStorage: string;

  constructor(private authService: AuthService, private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.validateUser();
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
}
