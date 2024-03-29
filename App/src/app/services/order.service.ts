import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderRequirementPayload } from '../order/order-requirement/order-requirement-payload';
import { OrderCreatingPayload } from '../order/order-requirement/order-creating-payload';
import { ResponsePayload } from '../shared/response-payload';
import { OrderDashboardPayload } from '../order/orders-dashboard/order-dashboard-payload';
import { OrderDetailsPayload } from '../order/order-details/order-details-payload';
import { OrderStatusChangePayload } from '../order/order-details/order-status-change-payload';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = "http://localhost:8080/api/order/";

  constructor(private http: HttpClient) { }

  connectOrderRequirementDetailsApi(requestForm: FormData): Observable<OrderRequirementPayload> {

    return this.http.post<OrderRequirementPayload>(this.url + "orderrequirement/", requestForm);
  }

  connectCreateOrderApi(newOrder: OrderCreatingPayload): Observable<ResponsePayload> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.post<ResponsePayload>(this.url + "ordercreationg/", newOrder, options);
  }

  connectGetOrdersByUserApi(username: string, orderStatus: string): Observable<OrderDashboardPayload[]> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.post<OrderDashboardPayload[]>(this.url + "orders/" + username, orderStatus, options);
  }

  connectGetOrdersByFarmerApi(username: string, orderStatus: string): Observable<OrderDashboardPayload[]> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.post<OrderDashboardPayload[]>(this.url + "ordersbyfarmer/" + username, orderStatus, options);
  }

  connectGetOrderDetailsByOrderIdApi(orderId: string): Observable<OrderDetailsPayload> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.get<OrderDetailsPayload>(this.url + "orderdetails/" + orderId, options);
  }

  connectChangeOrderStatusByOrderIdApi(orderStatusChangePayload: OrderStatusChangePayload): Observable<ResponsePayload> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.put<ResponsePayload>(this.url + "changeorderstatus/", orderStatusChangePayload, options);
  }

  connectDeleteOrderByOrderIdApi(orderId: string): Observable<ResponsePayload> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.delete<ResponsePayload>(this.url + "deleteorder/" + orderId, options);
  }

  connectChangeOrderStatusToLateByOrderIdApi(orderId: string): Observable<ResponsePayload> {
    let httpHeader = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = { headers: httpHeader };

    return this.http.put<ResponsePayload>(this.url + "changeorderstatustolate/" + orderId, options);
  }
}


