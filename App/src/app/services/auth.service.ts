import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginPayload } from '../auth/login/login-payload';
import { Observable } from 'rxjs';
import { JwtAuthResponse } from '../auth/login/jwt-auth-response';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { SignupPayload } from '../auth/signup/signup-payload'
import { JwtHelperService } from '@auth0/angular-jwt';
import { ResponsePayload } from '../shared/response-payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "http://localhost:8080/api/auth/";

  constructor(private http: HttpClient, private localStorageService: LocalStorageService, public jwtHelper: JwtHelperService) { }

  connectSignupApi(signupPayload: SignupPayload): Observable<ResponsePayload> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = {
      headers: httpHeader
    };
    return this.http.post<ResponsePayload>(this.url + 'signup', signupPayload, options);
  }

  connectLoginApi(loginPayload: LoginPayload): Observable<void> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = {
      headers: httpHeader
    };
    return this.http.post<JwtAuthResponse>(this.url + 'login', loginPayload, options).pipe(map(data => {
      this.localStorageService.store('authenticationtoken', data.authenticationtoken);
      this.localStorageService.store('username', data.username.toLowerCase());
      this.localStorageService.store('role', data.role);
    }))
  }

  isAuthenticated(): Boolean {
    const authenticationtoken = this.localStorageService.retrieve('authenticationtoken');
    return !this.jwtHelper.isTokenExpired(authenticationtoken);
  }

  validateUserByUsernameFromUrlAndUsernameFromLocalStorage(usernameFromUrl: string): boolean {
    let usernameFromLocalStorage = this.localStorageService.retrieve('username');

    if (this.isAuthenticated() && usernameFromUrl === usernameFromLocalStorage) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.localStorageService.clear('authenticationtoken');
    this.localStorageService.clear('username');
    this.localStorageService.clear('role');
  }
}
