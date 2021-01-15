import { Component, OnInit } from '@angular/core';
import { DashboardShopPayload } from './dashboard-shop-payload';
import { ShopService } from '../../../services/shop.service'
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ResponsePayload } from 'src/app/shared/response-payload';

@Component({
  selector: 'app-farmer-dashboard',
  templateUrl: './farmer-dashboard.component.html',
  styleUrls: ['./farmer-dashboard.component.css']
})
export class FarmerDashboardComponent implements OnInit {

  dashboardShops: DashboardShopPayload[];
  isShopDeleted: boolean;
  isShopNotDeleted: boolean;
  shopId: number;
  shopTitle: string;
  hasIncompletedOrders: boolean;

  constructor(private shopService: ShopService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllDashboardShops();
  }

  //Slice the current url and get the username
  getUsernameFromUrl(): string {
    return this.router.url.slice(6, (this.router.url.length - 17));
  }

  getAllDashboardShops() {
    this.shopService.connectDashboardShopsByUsernameApi(this.getUsernameFromUrl()).subscribe((data) => {

      if (this.authService.validateUserByUsernameFromUrlAndUsernameFromLocalStorage(this.getUsernameFromUrl())) {
        this.dashboardShops = data;

      } else {
        this.router.navigate(['error']);
      }

    },
      error => {
        this.router.navigate(['error']);
      });
  }

  getShopIdAndShopTitle(shopId: number, shopTitle: string) {
    this.shopId = shopId;
    this.shopTitle = shopTitle;
  }

  deleteShop() {
    this.shopService.connectDeleteShopApi(this.shopId).subscribe((response) => {

      let shopDeletingResponse: ResponsePayload;
      shopDeletingResponse = response;

      if (shopDeletingResponse.responseStatus) {
        this.isShopDeleted = shopDeletingResponse.responseStatus;
        this.isShopNotDeleted = false;
        this.hasIncompletedOrders = false;
        this.ngOnInit();
      }
      else {

        if (shopDeletingResponse.responseBody === "The shop has incompleted orders, Shop delete failed!") {
          this.hasIncompletedOrders = true;
          this.isShopDeleted = false;

        } else {
          this.isShopNotDeleted = true;
          this.isShopDeleted = false;
        }
      }
    },
      error => {
        this.isShopNotDeleted = true;
      });
  }

}