import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ShopCreatePayload } from './shop-create-payload';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { ResponsePayload } from 'src/app/shared/response-payload';
import { LocalStorageService } from 'ngx-webstorage';

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
  shopPictureFromUser: File;
  shopPicture: any;
  isInvalidType: boolean;
  isExceedMax: boolean;

  constructor(private shopService: ShopService, private formbuilder: FormBuilder, private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {

    this.newShopFrom = this.formbuilder.group({
      title: ['', [Validators.required, Validators.maxLength(70)]],
      category: ['', [Validators.required]],
      subCategory: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(650)]],
      shopPicture: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      priceOfOneUnit: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.max(100000)]],
      deliveryDays: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.max(30)]],
      location: ['', [Validators.required]],
    });
  }


  // Getting the image data from user and assign it into the variable and validate the file type and size
  getshopPictureDataFromUser(event: any) {
    this.shopPictureFromUser = event.target.files[0];

    if (this.shopPictureFromUser.size > 1.5e+6) {
      this.isExceedMax = true;

    } else {
      this.isExceedMax = false;
    }

    if (!this.shopPictureFromUser.type.startsWith("image")) {
      this.isInvalidType = true;

    } else {
      this.isInvalidType = false;
    }
  }

  // Reset the from values
  clearForm() {
    this.newShopFrom.reset();
  }

  // Getting the formcontrols of new shop form
  get formControls() {
    return this.newShopFrom.controls;
  }

  // Get the form values and assign those into shop variable
  // Add created date and username from local storage into shop variable and pass it into postNewShopData()
  // Append shop picture data into FormData type
  submitNewShopData() {

    this.datasaved = false;
    this.datanotsaved = false;
    this.shop = this.newShopFrom.value;

    let createdDate = new Date();
    this.shop.createdDate = formatDate(createdDate, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    this.shop.username = this.localStorageService.retrieve('username');

    const shopData = new FormData();
    shopData.append('shopPicture', this.shopPictureFromUser, this.shopPictureFromUser.name);
    shopData.append('shopDetails', new Blob([JSON.stringify(this.shop)], { type: "application/json" }));

    this.postNewShopData(shopData);
  }

  // Post the shop data via the shop service with connectCreateShopApi()
  postNewShopData(shopData: FormData) {
    this.shopService.connectCreateShopApi(shopData).subscribe(response => {

      let shopCreatingResponse: ResponsePayload;
      shopCreatingResponse = response;

      if (shopCreatingResponse.responseStatus) {
        this.datasaved = shopCreatingResponse.responseStatus;
        this.newShopFrom.reset();
      }
      else {
        this.datanotsaved = true;
      }
    },
      error => {
        this.datanotsaved = true;
      });
  }

}
