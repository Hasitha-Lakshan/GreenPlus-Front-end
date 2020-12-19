import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeShopPayload } from '../shops/shops-home/home-shop-payload';
import { ShopDetailsPayload } from '../shops/shop-details/shop-details-payload';
import { ProfileShopPayload } from '../shops/shops-profile/profile-shop-payload';
import { DashboardShopPayload } from '../user/profile/farmer-dashboard/dashboard-shop-payload'

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private url = "http://localhost:8080/api/public/";
  private url_2 = "http://localhost:8080/api/farmer/";

  constructor(private http: HttpClient) { }

  connectHomeShopsApi(): Observable<HomeShopPayload[]> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.get<HomeShopPayload[]>(this.url + "shops", options);
  }

  connectShopByShopidApi(shopId: string): Observable<ShopDetailsPayload> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.get<ShopDetailsPayload>(this.url + "shopbyshopid/" + shopId, options);
  }

  connectShopByUsernameApi(username: string): Observable<ProfileShopPayload[]> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.get<ProfileShopPayload[]>(this.url + "shopsbyuser/" + username, options);
  }

  connectDashboardShopsByUsernameApi(username: string): Observable<DashboardShopPayload[]> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.get<DashboardShopPayload[]>(this.url_2 + "shopsbyuser/" + username, options);
  }

}
