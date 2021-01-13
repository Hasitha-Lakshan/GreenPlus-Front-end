import { Component, OnInit } from '@angular/core';
import { OrderDetailsPayload } from './order-details-payload';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from 'ngx-webstorage';

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

  constructor(private orderService: OrderService, private router: Router, private authService: AuthService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {

    this.getShopIdFromUrl();
    this.getCurrentUsername();
    this.getShopDetails();
  }

  //Slice the current url and get the orderId
  getShopIdFromUrl(): string {
    return this.router.url.slice(this.router.url.search("/order/") + 7, (this.router.url.length));
  }

  getCurrentUsername() {
    if (this.authService.isAuthenticated()) {
      this.currentUsername = this.localStorageService.retrieve("username").toLowerCase();
    }
  }

  getShopDetails() {
    this.orderService.connectGetOrderDetailsByOrderIdApi(this.getShopIdFromUrl()).subscribe((data) => {

      if (data != null) {
        this.orderDetailsPayload = data;

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