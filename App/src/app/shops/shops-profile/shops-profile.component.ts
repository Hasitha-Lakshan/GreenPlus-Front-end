import { Component, OnInit } from '@angular/core';
import { ProfileShopPayload } from './profile-shop-payload';
import { ShopService } from '../../services/shop.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-shops-profile',
  templateUrl: './shops-profile.component.html',
  styleUrls: ['./shops-profile.component.css']
})
export class ShopsProfileComponent implements OnInit {

  profileShops: ProfileShopPayload[];

  constructor(private shopService: ShopService, private router: Router) { }

  ngOnInit(): void {
    this.getProfileShops();
  }

  //Slice the current url and get the username
  getUsernameFromUrl(): string {

    if (this.router.url.endsWith('/profile')) {
      return this.router.url.slice(6, (this.router.url.length - 8));

    } else {
      return this.router.url.slice(6, this.router.url.length);
    }
  }

  //Get profile shop detials using the username form url
  getProfileShops() {
    this.shopService.connectShopByUsernameApi(this.getUsernameFromUrl()).subscribe((data) => {
      this.profileShops = data;

    },
      error => {
        this.router.navigate(['error']);
      });
  }

}
