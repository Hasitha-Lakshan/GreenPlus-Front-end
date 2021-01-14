import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from '../../services/auth.service';
import { OrderDashboardPayload } from '../orders-dashboard/order-dashboard-payload';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.css']
})
export class ActiveOrdersComponent implements OnInit {

  activeOrders: OrderDashboardPayload[];
  activeOrdersByFarmer: OrderDashboardPayload[];
  isFarmer: boolean;
  username: string;
  isEmptyOrdersByFarmer: boolean;
  isEmptyOrdersByShops: boolean;

  constructor(private orderService: OrderService, private router: Router, private authService: AuthService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {

    this.getUsernameFromUrl();
    this.getActiveOrdersByByersAndFromShops();
  }

  //Slice the current url and get the username
  getUsernameFromUrl() {
    if (this.router.url.endsWith('/active-orders')) {
      this.username = this.router.url.slice(6, (this.router.url.length - 31));
      this.isValidateFarmer(this.username);
    }
  }

  isValidateFarmer(username: string) {
    if (this.authService.validateUserByUsernameFromUrlAndUsernameFromLocalStorage(username)) {
      let userRole = this.localStorageService.retrieve('role');

      if (userRole.toUpperCase() === "FARMER") {
        this.getActiveOrdersByFarmer();
        this.isFarmer = true;

      } else {
        this.isFarmer = false;
      }
    } else {
      this.router.navigate(['error']);
    }
  }

  getActiveOrdersByByersAndFromShops() {
    this.orderService.connectGetOrdersByUserApi(this.username, "ACTIVE").subscribe((data) => {

      if (data != null) {
        this.activeOrders = data;
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

  getActiveOrdersByFarmer() {
    this.orderService.connectGetOrdersByFarmerApi(this.username, "ACTIVE").subscribe((data) => {

      if (data != null) {
        this.activeOrdersByFarmer = data;
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
