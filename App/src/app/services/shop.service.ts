import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeShopPayload } from '../shops/shops-home/home-shop-payload';
import { ShopDetailsPayload } from '../shops/shop-details/shop-details-payload';
import { ProfileShopPayload } from '../shops/shops-profile/profile-shop-payload';
import { DashboardShopPayload } from '../user/profile/farmer-dashboard/dashboard-shop-payload'
import { ShopCreatePayload } from '../shops/shop-create/shop-create-payload';
import { ResponsePayload } from '../shared/response-payload';
import { ShopUpdateDetailsPayload } from '../shops/shop-update/shop-update-details-payload';
import { ShopUpdatePayload } from '../shops/shop-update/shop-update-payload';


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

  connectCreateShopApi(newShop: FormData): Observable<ResponsePayload> {

    return this.http.post<ResponsePayload>(this.url_2 + "shopcreating/", newShop);
  }

  connectShopDetailsByShopIdApi(shopId: string): Observable<ShopUpdateDetailsPayload> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.get<ShopUpdateDetailsPayload>(this.url_2 + "shopsbyshopid/" + shopId, options);
  }

  connectShopUpdateApi(updatedShop: ShopUpdatePayload, shopId: string): Observable<ResponsePayload> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.put<ResponsePayload>(this.url_2 + "shopupdate/" + shopId, updatedShop, options);
  }

  connectDeleteShopApi(shopId: number): Observable<ResponsePayload> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.delete<ResponsePayload>(this.url_2 + "shopdelete/" + shopId, options);
  }

}
