import { Component, OnInit } from '@angular/core';
import { OrderDetailsPayload } from './order-details-payload';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from 'ngx-webstorage';
import { ResponsePayload } from 'src/app/shared/response-payload';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderDetailsPayload: OrderDetailsPayload;
  contactUsername: string;
  isFarmer: boolean;
  isBuyer: boolean;
  isInprogressOrder: boolean;
  isLateOrder: boolean;
  isCompletedOrder: boolean;
  currentUsername: string;
  completedDate: string;
  isStatusUpdateFailed: boolean;
  isDeclineFailed: boolean;

  constructor(private orderService: OrderService, private router: Router, private authService: AuthService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {

    this.getOrderIdFromUrl();
    this.getCurrentUsername();
    this.getShopDetails();
  }

  //Slice the current url and get the orderId
  getOrderIdFromUrl(): string {
    return this.router.url.slice(this.router.url.search("/order/") + 7, (this.router.url.length));
  }

  getCurrentUsername() {
    if (this.authService.isAuthenticated()) {
      this.currentUsername = this.localStorageService.retrieve("username").toLowerCase();
    }
  }

  decline() {
    this.orderService.connectDeleteOrderByOrderIdApi(this.getOrderIdFromUrl()).subscribe((response) => {

      let orderDeclineResponse: ResponsePayload;
      orderDeclineResponse = response;

      if (orderDeclineResponse.responseStatus) {
        this.isDeclineFailed = !orderDeclineResponse.responseStatus;
        this.router.navigate(['user/' + this.currentUsername + '/orders-dashboard']);

      } else {
        this.isDeclineFailed = !orderDeclineResponse.responseStatus;
      }
    },
      error => {
        //this.router.navigate(['error']);
      });
  }

  toActive() {

    const orderStatusData = new FormData();
    orderStatusData.append("orderId", this.getOrderIdFromUrl());
    orderStatusData.append("username", this.currentUsername);
    orderStatusData.append("orderStatus", "ACTIVE");

    this.changeOrderStatus(orderStatusData);
  }

  toComplete() {

    const orderStatusData = new FormData();
    orderStatusData.append("orderId", this.getOrderIdFromUrl());
    orderStatusData.append("username", this.currentUsername);
    orderStatusData.append("orderStatus", "COMPLETE");

    this.changeOrderStatus(orderStatusData);
  }

  changeOrderStatus(orderStatusData: FormData) {
    this.orderService.connectChangeOrderStatusByOrderIdApi(orderStatusData).subscribe((response) => {

      let orderStatusUpdateResponse: ResponsePayload;
      orderStatusUpdateResponse = response;

      if (orderStatusUpdateResponse.responseStatus) {
        this.isStatusUpdateFailed = !orderStatusUpdateResponse.responseStatus;
        this.ngOnInit();

      } else {
        this.isStatusUpdateFailed = !orderStatusUpdateResponse.responseStatus;
      }
    },
      error => {
        this.router.navigate(['error']);
      });
  }

  getShopDetails() {
    this.orderService.connectGetOrderDetailsByOrderIdApi(this.getOrderIdFromUrl()).subscribe((data) => {

      if (data != null) {
        this.orderDetailsPayload = data;
        this.completedDate = formatDate(data.completedDate, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');

        //////////////////////////////////     Check Order Status     //////////////////////////////////////////

        //Check whether the order is in inprogress or not
        if (data.orderStatus === "INPROGRESS") {
          this.isInprogressOrder = true;

        } else {
          this.isInprogressOrder = false;
        }

        //Check whether the order is late or not
        if (data.orderStatus === "LATE") {
          this.isLateOrder = true;

        } else {
          this.isLateOrder = false;
        }

        //Check whether the order is completed or not
        if (data.orderStatus === "COMPLETE") {
          this.isCompletedOrder = true;

        } else {
          this.isCompletedOrder = false;
        }

        //////////////////////////   Check whether the farmer or not   //////////////////////////////////////

        if (data.farmerUsername === this.currentUsername) {
          this.isFarmer = true;

        } else {
          this.isFarmer = false;
          this.contactUsername = data.farmerUsername;
        }

        //////////////////////////   Check whether the buyer or not   //////////////////////////////////////

        if (data.buyerUsername === this.currentUsername) {
          this.isBuyer = true;

        } else {
          this.isBuyer = false;
          this.contactUsername = data.buyerUsername;
        }

      } else {
        this.router.navigate(['error']);
      }
    },
      error => {
        this.router.navigate(['error']);
      });
  }

}