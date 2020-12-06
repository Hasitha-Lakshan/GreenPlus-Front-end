import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeShop } from '../shops/shops-home/home-shop';
import { Shop } from '../shops/shop-details/shop';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private url = "http://localhost:8080/api/public/";

  constructor(private http: HttpClient) { }

  connectHomeShopsApi(): Observable<HomeShop[]> {
    return this.http.get<HomeShop[]>(this.url + "shops");
  }

  connectShopByShopidApi(shopId: number): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.url + "shopbyshopid/" + shopId);
  }
}
