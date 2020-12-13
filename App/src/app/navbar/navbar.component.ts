import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin: boolean;
  username: string;
  isFarmer: boolean;

  constructor(private authService: AuthService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {

    this.loginCheck();
  }

  loginCheck() {

    if (this.authService.isAuthenticated()) {
      this.isLogin = true;
      this.username = this.localStorageService.retrieve('username');

      if (this.localStorageService.retrieve('role') === "FARMER") {
        this.isFarmer = true;
      }

    } else {
      this.isLogin = false;
    }
  }

  logout() {
    this.authService.logout();
    this.ngOnInit();
  }
}
