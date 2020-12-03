import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginPayload } from '../auth/login/login-payload';
import { Observable } from 'rxjs';
import { JwtAuthResponse } from '../auth/login/jwt-auth-response';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { SignupPayload } from '../auth/signup/signup-payload'
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "http://localhost:8080/api/auth/";

  constructor(private http: HttpClient, private localStorageService: LocalStorageService, public jwtHelper: JwtHelperService) { }

  connectSignupApi(signupPayload: SignupPayload): Observable<SignupPayload> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = {
      headers: httpHeader
    };
    return this.http.post<SignupPayload>(this.url + 'signup', signupPayload, options);
  }

  connectLoginApi(loginPayload: LoginPayload): Observable<string> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = {
      headers: httpHeader
    };
    return this.http.post<JwtAuthResponse>(this.url + 'login', loginPayload, options).pipe(map(data => {
      this.localStorageService.store('authenticationToken', data.authenticationToken);
      this.localStorageService.store('username', data.username);
      this.localStorageService.store('role', data.role);

      return data.role;
    }))
  }

  isAuthenticated(): Boolean {
    const authenticationToken = this.localStorageService.retrieve('authenticationToken');
    return !this.jwtHelper.isTokenExpired(authenticationToken);
  }

  logout() {
    this.localStorageService.clear('authenticationToken');
    this.localStorageService.clear('username');
    this.localStorageService.clear('role');
  }
}
