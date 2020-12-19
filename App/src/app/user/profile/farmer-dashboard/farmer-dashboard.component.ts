import { Component, OnInit } from '@angular/core';
import { DashboardShop } from './dashboard-shop';
import { ShopService } from '../../../services/shop.service'
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-farmer-dashboard',
  templateUrl: './farmer-dashboard.component.html',
  styleUrls: ['./farmer-dashboard.component.css']
})
export class FarmerDashboardComponent implements OnInit {

  dashboardShops: DashboardShop[];

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

      if (this.authService.validateUserByUsernameFromUrlAndLocalStorageUsingUserId(this.getUsernameFromUrl())) {
        this.dashboardShops = data;

      } else {
        this.router.navigate(['error']);
      }

    },
      error => {
        this.router.navigate(['error']);
      });
  }

}
