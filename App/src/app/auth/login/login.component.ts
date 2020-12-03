import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPayload } from "./login-payload";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'User Login Page';

  loginForm: FormGroup;
  loginPayload: LoginPayload;
  notRegistered: boolean;

  constructor(private authService: AuthService, private formbuilder: FormBuilder, private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.logincheck();

    this.loginForm = this.formbuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  submitLoginData() {
    this.loginPayload = this.loginForm.value;
    this.postData(this.loginPayload);
  }

  postData(loginPayloadData: LoginPayload) {
    this.authService.connectLoginApi(loginPayloadData).subscribe(role => {
      this.naviageByRole(role);
    },
      error => {
        this.notRegistered = true;
      });
  }

  naviageByRole(role: string) {

    if (role == "ADMIN") {
      this.router.navigateByUrl('admin');
    }
    else if (role == "ANALYZER") {
      this.router.navigateByUrl('analyzer_dashboard');
    }
    else if (role == "INVENTORY_MANAGER") {
      this.router.navigateByUrl('inventory_manager');
    }
    else if (role == "CASH_COLLECTOR") {
      this.router.navigateByUrl('header');
    }
  }

  logincheck() {

    if (this.authService.isAuthenticated) {
      let role = this.localStorageService.retrieve("role");
      this.naviageByRole(role);
    }
  }
}