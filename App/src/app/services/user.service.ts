import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { ResponsePayload } from '../shared/response-payload';
import { UserProfile } from '../user/profile/user-profile'
import { ResetPasswordPayload } from '../user/settings/reset-password-payload';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:8080/api/user/";
  private url_2 = "http://localhost:8080/api/public/";

  constructor(private http: HttpClient) { }

  connectUserDetailsPublicApi(username: string): Observable<UserProfile> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.get<UserProfile>(this.url_2 + "user/" + username, options);
  }

  connectDeactivateAccountApi(username: string): Observable<ResponsePayload> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.put<ResponsePayload>(this.url + "deactivateaccount/" + username, options);
  }

  connectResetPasswordnApi(username: string, resetPasswordPayloadData: ResetPasswordPayload): Observable<ResponsePayload> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.put<ResponsePayload>(this.url + "resetpassword/" + username, resetPasswordPayloadData, options);
  }
}
