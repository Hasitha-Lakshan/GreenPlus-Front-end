import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserPublic } from '../profile/user-public'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private url = "http://localhost:8080/api/public/";

  constructor(private http: HttpClient) { }

  connectUserDetailsPublicApi(username: string): Observable<UserPublic> {
    return this.http.get<UserPublic>(this.url + "user/" + username);
  }
}
