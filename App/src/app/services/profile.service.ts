import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../user/profile/user-profile'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private url = "http://localhost:8080/api/public/";

  constructor(private http: HttpClient) { }

  connectUserDetailsPublicApi(username: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.url + "user/" + username);
  }
}
