import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { ResponsePayload } from '../shared/response-payload';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:8080/api/user/";

  constructor(private http: HttpClient) { }

  connectDeactivateAccountApi(username: string): Observable<ResponsePayload> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.put<ResponsePayload>(this.url + "deactivateaccount/" + username, options);
  }
}
