import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ShopCreatePayload } from './shop-create-payload';
import {formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-create',
  templateUrl: './shop-create.component.html',
  styleUrls: ['./shop-create.component.css']
})
export class ShopCreateComponent implements OnInit {

  newShopFrom: FormGroup;
  shop: ShopCreatePayload;
  datasaved: boolean;
  datanotsaved: boolean;

  constructor(private shopService: ShopService, private formbuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.newShopFrom = this.formbuilder.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      subCategory: ['', [Validators.required]],
      description: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      priceOfOneUnit: ['', [Validators.required]],
      deliveryDays: ['', [Validators.required]],
      location: ['', [Validators.required]],
    });
  }

  clearForm() {
    this.newShopFrom.reset();
  }

  get formControls() {
    return this.newShopFrom.controls;
  }

  submitNewShopData() {

    this.datasaved = false;
    this.datanotsaved = false;
    this.shop = this.newShopFrom.value;

    let createdDate = new Date();
    this.shop.createdDate = formatDate(createdDate, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    //this.postData(this.shop);
  }

 /* postData(newShop: Shop) {
    this.shopService.connectSignupApi(newShop).subscribe(status => {
      let signupStatus: any;
      signupStatus = status;

      if (signupStatus) {
        this.datasaved = signupStatus;
        this.signupForm.reset();
      }
      else {
        this.datanotsaved = true;
      }
    });
  }*/

}
