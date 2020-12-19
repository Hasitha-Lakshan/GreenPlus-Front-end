import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Shop } from './shop';
import { MustMatch } from '../../shared/mustMatch';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-create',
  templateUrl: './shop-create.component.html',
  styleUrls: ['./shop-create.component.css']
})
export class ShopCreateComponent implements OnInit {

  newShopFrom: FormGroup;
  shop: Shop;
  datasaved: boolean;
  datanotsaved: boolean;

  constructor(private shopService: ShopService, private formbuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.newShopFrom = this.formbuilder.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      subCategory: ['', [Validators.required]],
      description: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      deliveryTime: ['', [Validators.required]],
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
    this.shop.createdDate = new Date();
    console.log(this.shop);
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
