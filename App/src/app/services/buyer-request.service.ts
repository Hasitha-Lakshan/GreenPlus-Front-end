import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BuyerRequestPayload } from '../buyer-request/buyer-request-payload'
import { BuyerRequestProfilePayload } from '../buyer-request/buyer-request-profile/buyer-request-profile-payload'
import { DashboardBuyerRequestPayload } from '../user/profile/buyer-dashboard/dashboard-buyer-request-payload'
import { ResponsePayload } from '../shared/response-payload';

@Injectable({
  providedIn: 'root'
})
export class BuyerRequestService {

  private url = "http://localhost:8080/api/farmer/";
  private url_2 = "http://localhost:8080/api/buyer/";

  constructor(private http: HttpClient) { }

  connectAllBuyerRequestsApi(): Observable<BuyerRequestPayload[]> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.get<BuyerRequestPayload[]>(this.url + "buyerrequests", options);
  }

  connectActiveBuyerRequestsByUserApi(username: string): Observable<BuyerRequestProfilePayload[]> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.get<BuyerRequestProfilePayload[]>(this.url_2 + "activebuyerrequestsbyuser/" + username, options);
  }

  connectDashboardBuyerRequestsByUsernameApi(username: string): Observable<DashboardBuyerRequestPayload[]> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.get<DashboardBuyerRequestPayload[]>(this.url_2 + "buyerrequestsbyuser/" + username, options);
  }

  connectDeleteBuyerRequestApi(buyerRequestId: number): Observable<ResponsePayload> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.delete<ResponsePayload>(this.url_2 + "buyerrequestdelete/" + buyerRequestId, options);
  }
}
