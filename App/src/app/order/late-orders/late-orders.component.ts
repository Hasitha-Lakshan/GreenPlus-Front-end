import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from '../../services/auth.service';
import { OrderDashboardPayload } from '../orders-dashboard/order-dashboard-payload';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-late-orders',
  templateUrl: './late-orders.component.html',
  styleUrls: ['./late-orders.component.css']
})
export class LateOrdersComponent implements OnInit {

  lateOrders: OrderDashboardPayload[];
  lateOrdersByFarmer: OrderDashboardPayload[];
  isFarmer: boolean;
  username: string;
  isEmptyOrdersByFarmer: boolean;
  isEmptyOrdersByShops: boolean;

  constructor(private orderService: OrderService, private router: Router, private authService: AuthService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.getUsernameFromUrl();
    this.getLateOrdersByByersAndFromShops();
  }

  //Slice the current url and get the username
  getUsernameFromUrl() {
    if (this.router.url.endsWith('/late-orders')) {
      this.username = this.router.url.slice(6, (this.router.url.length - 29));
      this.isValidateFarmer(this.username);
    }
  }

  isValidateFarmer(username: string) {
    if (this.authService.validateUserByUsernameFromUrlAndUsernameFromLocalStorage(username)) {
      let userRole = this.localStorageService.retrieve('role');

      if (userRole.toUpperCase() === "FARMER") {
        this.getLateOrdersByFarmer();
        this.isFarmer = true;

      } else {
        this.isFarmer = false;
      }
    } else {
      this.router.navigate(['error']);
    }
  }

  getLateOrdersByByersAndFromShops() {
    this.orderService.connectGetOrdersByUserApi(this.username, "LATE").subscribe((data) => {

      if (data != null) {
        this.lateOrders = data;
      }

      if (data.length == 0) {
        this.isEmptyOrdersByShops = true;

      } else {
        this.isEmptyOrdersByShops = false;
      }
    },
      error => {
        this.router.navigate(['error']);
      });
  }

  getLateOrdersByFarmer() {
    this.orderService.connectGetOrdersByFarmerApi(this.username, "LATE").subscribe((data) => {

      if (data != null) {
        this.lateOrdersByFarmer = data;
      }

      if (data.length == 0) {
        this.isEmptyOrdersByFarmer = true;

      } else {
        this.isEmptyOrdersByFarmer = false;
      }
    },
      error => {
        this.router.navigate(['error']);
      });
  }

}
