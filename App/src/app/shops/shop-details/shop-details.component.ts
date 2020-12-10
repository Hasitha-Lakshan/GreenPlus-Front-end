import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ShopService } from '../../services/shop.service'
import { AuthService } from '../../services/auth.service'
import { Shop } from './shop';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent implements OnInit {

  url: string;
  shopId: string;
  shop: Shop;
  usernameFromLocalStorage: string;

  constructor(private shopService: ShopService, private router: Router, private localStorageService: LocalStorageService, private authService: AuthService) { }

  ngOnInit(): void {

    this.getShopDetails();
    this.getUsernameFromLocalStorage();
  }

  getUsernameFromLocalStorage() {

    if (this.authService.isAuthenticated)
      this.usernameFromLocalStorage = this.localStorageService.retrieve('username');
  }

  getShopDetails() {

    this.url = this.router.url;
    this.shopId = this.url.slice(6, this.url.length);

    this.shopService.connectShopByShopidApi(this.shopId).subscribe((data) => {

      if (data != null) {
        this.shop = data;

      } else {
        this.router.navigate(['error']);
      }

    },
      error => {
        this.router.navigate(['error']);
      });
  }

}
