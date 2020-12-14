import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BuyerRequest } from '../buyer-request/buyer-request'

@Injectable({
  providedIn: 'root'
})
export class BuyerRequestService {

  private url = "http://localhost:8080/api/farmer/";

  constructor(private http: HttpClient) { }

  connectHomeShopsApi(): Observable<BuyerRequest[]> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.get<BuyerRequest[]>(this.url + "buyerrequests", options);
  }
}
