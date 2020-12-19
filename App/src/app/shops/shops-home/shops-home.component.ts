import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service'
import { HomeShopPayload } from './home-shop-payload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shops-home',
  templateUrl: './shops-home.component.html',
  styleUrls: ['./shops-home.component.css']
})
export class ShopsHomeComponent implements OnInit {

  homeShops: HomeShopPayload[];

  constructor(private shopService: ShopService, private router: Router) { }

  ngOnInit(): void {

    this.getHomeShops();
  }

  getHomeShops() {
    this.shopService.connectHomeShopsApi().subscribe((data) => {

      if (data != null) {
        this.homeShops = data;
      }
    },
      error => {
        this.router.navigate(['error']);
      });

  }
}
