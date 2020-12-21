import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponsePayload } from 'src/app/shared/response-payload';
import { LocalStorageService } from 'ngx-webstorage';
import { ShopService } from '../../services/shop.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { ShopUpdateDetailsPayload } from './shop-update-details-payload';
import { ShopUpdatePayload } from './shop-update-payload';

@Component({
  selector: 'app-shop-update',
  templateUrl: './shop-update.component.html',
  styleUrls: ['./shop-update.component.css']
})
export class ShopUpdateComponent implements OnInit {

  shopFrom: FormGroup;
  shop: ShopUpdateDetailsPayload;
  updatedShop: ShopUpdatePayload;
  datasaved: boolean;
  datanotsaved: boolean;
  username: string;

  constructor(private shopService: ShopService, private formbuilder: FormBuilder, private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {

    this.shopFrom = this.formbuilder.group({
      title: [''],
      category: [''],
      subCategory: [''],
      description: [''],
      unit: [''],
      priceOfOneUnit: [''],
      deliveryDays: [''],
      location: [''],
      shopStatus: ['']
    });

    this.getShopDetails();
    this.getUsernameFromLocalStorage();
  }

  getUsernameFromLocalStorage() {
    this.username = this.localStorageService.retrieve('username');
  }

  get formControls() {
    return this.shopFrom.controls;
  }

  private getShopIdFromUrl(): string {
    let url = this.router.url;
    return url.slice(30, url.length);
  }

  getShopDetails() {
    this.shopService.connectShopDetailsByShopidApi(this.getShopIdFromUrl()).subscribe((data) => {

      if (data != null) {
        this.shop = data;
        this.shopFrom = new FormGroup({
          title: new FormControl(this.shop.title, [Validators.required]),
          category: new FormControl(this.shop.category, [Validators.required]),
          subCategory: new FormControl(this.shop.subCategory, [Validators.required]),
          description: new FormControl(this.shop.description, [Validators.required]),
          unit: new FormControl(this.shop.unit, [Validators.required]),
          priceOfOneUnit: new FormControl(this.shop.priceOfOneUnit, [Validators.required]),
          deliveryDays: new FormControl(this.shop.deliveryDays, [Validators.required]),
          location: new FormControl(this.shop.location, [Validators.required]),
          shopStatus: new FormControl(this.shop.shopStatus)
        });

      } else {
        this.router.navigate(['error']);
      }

    },
      error => {
        this.router.navigate(['error']);
      });
  }

  updateShopData() {

    this.datasaved = false;
    this.datanotsaved = false;
    this.updatedShop = this.shopFrom.value;
    this.putShopData(this.updatedShop);
  }

  putShopData(updatedShop: ShopUpdatePayload) {
    this.shopService.connectShopUpdateApi(updatedShop, this.getShopIdFromUrl()).subscribe(response => {
      let shopCreatingResponse: ResponsePayload;
      shopCreatingResponse = response;

      if (shopCreatingResponse.responseStatus) {
        this.datasaved = shopCreatingResponse.responseStatus;
        this.ngOnInit();
      }
      else {
        this.datanotsaved = true;
      }
    });
  }

}
