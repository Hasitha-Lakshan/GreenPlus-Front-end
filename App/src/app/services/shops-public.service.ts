import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shop } from '../home/shops-home/shop';

@Injectable({
  providedIn: 'root'
})
export class ShopsPublicService {

  private url = "http://localhost:8080/api/public/";

  constructor(private http: HttpClient) { }

  connectShopsApi(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.url + "shops");
  }
}
