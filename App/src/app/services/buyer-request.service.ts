import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BuyerRequest } from '../buyer-request/buyer-request'
import { DashboardBuyerRequest } from '../user/profile/buyer-dashboard/dashboard-buyer-request'

@Injectable({
  providedIn: 'root'
})
export class BuyerRequestService {

  private url = "http://localhost:8080/api/farmer/";
  private url_2 = "http://localhost:8080/api/buyer/";

  constructor(private http: HttpClient) { }

  connectAllBuyerRequestsApi(): Observable<BuyerRequest[]> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.get<BuyerRequest[]>(this.url + "buyerrequests", options);
  }

  connectActiveBuyerRequestsByUserApi(username: string): Observable<BuyerRequest[]> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.get<BuyerRequest[]>(this.url_2 + "activebuyerrequestsbyuser/" + username, options);
  }

  connectDashboardBuyerRequestsByUsernameApi(username: string): Observable<DashboardBuyerRequest[]> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.get<DashboardBuyerRequest[]>(this.url_2 + "buyerrequestsbyuser/" + username, options);
  }
}
