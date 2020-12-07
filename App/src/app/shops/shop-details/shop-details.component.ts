import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from '../../services/shop.service'
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

  constructor(private shopService: ShopService, private router: Router) { }

  ngOnInit(): void {

    this.getShopDetails();
  }

  getShopDetails() {

    this.url = this.router.url;
    this.shopId = this.url.slice(6, this.url.length);

    this.shopService.connectShopByShopidApi(this.shopId).subscribe((data) => {

      if (data != null) {
        this.shop = data;
        console.log(data);

      } else {
        this.router.navigate(['error']);
      }

    },
      error => {
        this.router.navigate(['error']);
      });
  }

}
