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
  shopPicture: any;
  isAvailableShopPicture: boolean;
  shopPictureName: string;
  shopPictureFromUser: File;
  isInvalidType: boolean;
  isExceedMax: boolean;

  constructor(private shopService: ShopService, private formbuilder: FormBuilder, private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {

    this.shopFrom = this.formbuilder.group({
      title: [''],
      category: [''],
      subCategory: [''],
      description: [''],
      shopPicture: [''],
      unit: [''],
      priceOfOneUnit: [''],
      deliveryDays: [''],
      location: [''],
      shopStatus: ['']
    });

    this.getShopDetails();
    this.getUsernameFromLocalStorage();
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
    this.shopService.connectShopDetailsByShopIdApi(this.getShopIdFromUrl()).subscribe((data) => {

      if (data != null) {
        this.shop = data;
        this.shopFrom = new FormGroup({
          title: new FormControl(this.shop.title, [Validators.required, Validators.maxLength(70)]),
          category: new FormControl(this.shop.category, [Validators.required]),
          subCategory: new FormControl(this.shop.subCategory, [Validators.required]),
          shopPicture: new FormControl(""),
          description: new FormControl(this.shop.description, [Validators.required, Validators.maxLength(650)]),
          unit: new FormControl(this.shop.unit, [Validators.required]),
          priceOfOneUnit: new FormControl(this.shop.priceOfOneUnit, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.max(100000)]),
          deliveryDays: new FormControl(this.shop.deliveryDays, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.max(30)]),
          location: new FormControl(this.shop.location, [Validators.required]),
          shopStatus: new FormControl(this.shop.shopStatus)
        });

        this.shopPicture = 'data:image/jpeg;base64,' + data.pictureBytes;
        this.shopPictureName = data.pictureName;
        this.isAvailableShopPicture = true;

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

    const updateShopData = new FormData();
    updateShopData.append('shopDetails', new Blob([JSON.stringify(this.updatedShop)], { type: "application/json" }));

    if(this.shopPictureFromUser != undefined) {
      updateShopData.append('shopPicture', this.shopPictureFromUser, this.shopPictureFromUser.name);
    }

    this.putShopData(updateShopData);
  }

  putShopData(updatedShop: FormData) {
    this.shopService.connectShopUpdateApi(updatedShop, this.getShopIdFromUrl()).subscribe(response => {
      let shopUpdatingResponse: ResponsePayload;
      shopUpdatingResponse = response;

      if (shopUpdatingResponse.responseStatus) {
        this.datasaved = shopUpdatingResponse.responseStatus;
        this.datanotsaved = false;
        this.ngOnInit();
      }
      else {
        this.datanotsaved = true;
        this.datasaved = false;
      }
    },
      error => {
        this.datanotsaved = true;
      });
  }

}
