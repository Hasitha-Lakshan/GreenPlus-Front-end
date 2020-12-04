import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.loginCheck();
  }

  loginCheck() {

    if (this.authService.isAuthenticated()) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }

}
