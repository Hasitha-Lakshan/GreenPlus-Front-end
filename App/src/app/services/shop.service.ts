import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeShop } from '../shops/shops-home/home-shop';
import { Shop } from '../shops/shop-details/shop';
import { ProfileShop } from '../shops/shops-profile/profile-shop';
import { DashboardShop } from '../user/profile/farmer-dashboard/dashboard-shop'

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private url = "http://localhost:8080/api/public/";
  private url_2 = "http://localhost:8080/api/farmer/";

  constructor(private http: HttpClient) { }

  connectHomeShopsApi(): Observable<HomeShop[]> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.get<HomeShop[]>(this.url + "shops", options);
  }

  connectShopByShopidApi(shopId: string): Observable<Shop> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.get<Shop>(this.url + "shopbyshopid/" + shopId, options);
  }

  connectShopByUsernameApi(username: string): Observable<ProfileShop[]> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.get<ProfileShop[]>(this.url + "shopsbyuser/" + username, options);
  }

  connectDashboardShopsByUsernameApi(username: string): Observable<DashboardShop[]> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.get<DashboardShop[]>(this.url_2 + "shopsbyuser/" + username, options);
  }

}
