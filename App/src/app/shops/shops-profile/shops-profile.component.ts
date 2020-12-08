import { Component, OnInit } from '@angular/core';
import { ProfileShop } from './profile-shop';
import { ShopService } from '../../services/shop.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-shops-profile',
  templateUrl: './shops-profile.component.html',
  styleUrls: ['./shops-profile.component.css']
})
export class ShopsProfileComponent implements OnInit {

  profileShops: ProfileShop[];
  username: string;
  url: string;

  constructor(private shopService: ShopService, private router: Router) { }

  ngOnInit(): void {
    this.getProfileShops();
  }

  getProfileShops() {

    this.url = this.router.url;
    this.username = this.url.slice(9, this.url.length);

    this.shopService.connectShopByUsernameApi(this.username).subscribe((data) => {
      this.profileShops = data;

    },
      error => {
        this.router.navigate(['error']);
      });
  }

}
