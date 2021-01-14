import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from '../../services/auth.service';
import { OrderDashboardPayload } from '../orders-dashboard/order-dashboard-payload';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-inprogress-orders',
  templateUrl: './inprogress-orders.component.html',
  styleUrls: ['./inprogress-orders.component.css']
})
export class InprogressOrdersComponent implements OnInit {

  inprogressOrders: OrderDashboardPayload[];
  inprogressOrdersByFarmer: OrderDashboardPayload[];
  isFarmer: boolean;
  username: string;
  isEmptyOrdersByFarmer: boolean;
  isEmptyOrdersByShops: boolean;

  constructor(private orderService: OrderService, private router: Router, private authService: AuthService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {

    this.getUsernameFromUrl();
    this.getInprogressOrdersByByersAndFromShops();
  }

  //Slice the current url and get the username
  getUsernameFromUrl() {

    if (this.router.url.endsWith('/inprogress-orders')) {
      this.username = this.router.url.slice(6, (this.router.url.length - 35));
      this.isValidateFarmer(this.username);

    } else {
      this.username = this.router.url.slice(6, this.router.url.length - 17);
      this.isValidateFarmer(this.username);
    }
  }

  isValidateFarmer(username: string) {
    if (this.authService.validateUserByUsernameFromUrlAndUsernameFromLocalStorage(username)) {
      let userRole = this.localStorageService.retrieve('role');

      if (userRole.toUpperCase() === "FARMER") {
        this.getInprogressOrdersByFarmer();
        this.isFarmer = true;

      } else {
        this.isFarmer = false;
      }
    } else {
      this.router.navigate(['error']);
    }
  }

  getInprogressOrdersByByersAndFromShops() {
    this.orderService.connectGetOrdersByUserApi(this.username, "INPROGRESS").subscribe((data) => {

      if (data != null) {
        this.inprogressOrders = data;
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

  getInprogressOrdersByFarmer() {
    this.orderService.connectGetOrdersByFarmerApi(this.username, "INPROGRESS").subscribe((data) => {

      if (data != null) {
        this.inprogressOrdersByFarmer = data;
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
