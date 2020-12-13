import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPayload } from "./login-payload";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginPayload: LoginPayload;
  notRegistered: boolean;

  constructor(private authService: AuthService, private formbuilder: FormBuilder, private router: Router) { }

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
      this.router.navigate(['home']);
    },
      error => {
        this.notRegistered = true;
      });
  }

  logincheck() {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['home']);
    }
  }

}