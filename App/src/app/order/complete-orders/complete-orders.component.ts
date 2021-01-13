import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from '../../services/auth.service';
import { OrderDashboardPayload } from '../orders-dashboard/order-dashboard-payload';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-complete-orders',
  templateUrl: './complete-orders.component.html',
  styleUrls: ['./complete-orders.component.css']
})
export class CompleteOrdersComponent implements OnInit {

  completeOrders: OrderDashboardPayload[];
  completeOrdersByFarmer: OrderDashboardPayload[];
  isFarmer: boolean;
  username: string;

  constructor(private orderService: OrderService, private router: Router, private authService: AuthService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.getUsernameFromUrl();
    this.getCompleteOrdersByByersAndFromShops();
  }

  //Slice the current url and get the username
  getUsernameFromUrl() {
    if (this.router.url.endsWith('/complete-orders')) {
      this.username = this.router.url.slice(6, (this.router.url.length - 33));
      this.isValidateFarmer(this.username);
    }
  }

  isValidateFarmer(username: string) {
    if (this.authService.validateUserByUsernameFromUrlAndUsernameFromLocalStorage(username)) {
      let userRole = this.localStorageService.retrieve('role');

      if (userRole.toUpperCase() === "FARMER") {
        this.getCompleteOrdersByFarmer();
        this.isFarmer = true;

      } else {
        this.isFarmer = false;
      }
    } else {
      this.router.navigate(['error']);
    }
  }

  getCompleteOrdersByByersAndFromShops() {
    this.orderService.connectGetOrdersByUserApi(this.username, "COMPLETE").subscribe((data) => {

      if (data != null) {
        this.completeOrders = data;
      }
    },
      error => {
        this.router.navigate(['error']);
      });
  }

  getCompleteOrdersByFarmer() {
    this.orderService.connectGetOrdersByFarmerApi(this.username, "COMPLETE").subscribe((data) => {

      if (data != null) {
        this.completeOrdersByFarmer = data;
      }
    },
      error => {
        this.router.navigate(['error']);
      });
  }

}
