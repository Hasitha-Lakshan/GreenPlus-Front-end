import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShopDetailsPayload } from '../home/shop-cards-public/shop-details-payload';

@Injectable({
  providedIn: 'root'
})
export class ShopCardsPublicService {

  private url = "http://localhost:8080/api/public/";

  constructor(private http: HttpClient) { }

  connectShopsApi(shopDetailsPayload: ShopDetailsPayload): Observable<ShopDetailsPayload> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = {
      headers: httpHeader
    };
    return this.http.post<ShopDetailsPayload>(this.url + 'signup', shopDetailsPayload, options);
  }

}
