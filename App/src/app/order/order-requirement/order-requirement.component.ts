import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from '../../services/order.service';
import { OrderRequirementPayload } from './order-requirement-payload';
import { OrderCreatingPayload } from './order-creating-payload';
import { formatDate } from '@angular/common';
import { ResponsePayload } from 'src/app/shared/response-payload';

@Component({
  selector: 'app-order-requirement',
  templateUrl: './order-requirement.component.html',
  styleUrls: ['./order-requirement.component.css']
})
export class OrderRequirementComponent implements OnInit {

  deliveryDetailsForm: FormGroup;
  OrderRequirements: OrderRequirementPayload;
  shopId: string;
  buyerUsername: string;
  priceOfOneUnit: number;
  unit: string;
  totalPrice: number;
  newOrder: OrderCreatingPayload;
  deliveryDays: number;
  isNotCreate: boolean;

  constructor(private orderService: OrderService, private formbuilder: FormBuilder, private router: Router, private authService: AuthService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {

    this.deliveryDetailsForm = this.formbuilder.group({
      deliveryAddressLine1: [''],
      deliveryAddressLine2: [''],
      deliveryAddressLine3: [''],
      deliveryLocation: [''],
      note: [''],
      quantity: [''],
      totalPrice: ['']
    });

    this.getshopIdFromUrl();
    this.getBuyerUsernameFromLocalStorage();
    this.getBuyerandShopDetails();
  }

  // Getting the formcontrols of new shop form
  get formControls() {
    return this.deliveryDetailsForm.controls;
  }

  calculateTotalPrice() {
    this.totalPrice = (this.deliveryDetailsForm.value.quantity * this.priceOfOneUnit);
  }

  private getBuyerUsernameFromLocalStorage() {
    if (this.authService.isAuthenticated) {
      this.buyerUsername = this.localStorageService.retrieve('username');
    }
  }

  private getshopIdFromUrl() {
    const url = this.router.url;
    this.shopId = url.slice(6, (url.length - 18));
  }

  private getBuyerandShopDetails() {

    let requestForm = new FormData();
    requestForm.append('shopId', this.shopId);
    requestForm.append('buyerUsername', this.buyerUsername);

    this.orderService.connectOrderRequirementDetailsApi(requestForm).subscribe((data) => {

      if (data != null) {
        this.OrderRequirements = data;

        this.unit = this.OrderRequirements.unit.slice(2, this.OrderRequirements.unit.length) + "s";
        this.priceOfOneUnit = this.OrderRequirements.priceOfOneUnit;
        this.deliveryDays = this.OrderRequirements.deliveryDays;

        this.deliveryDetailsForm = new FormGroup({
          deliveryAddressLine1: new FormControl(this.OrderRequirements.buyerAddressLine1, [Validators.required, Validators.maxLength(25)]),
          deliveryAddressLine2: new FormControl(this.OrderRequirements.buyerAddressLine2, [Validators.required, Validators.maxLength(25)]),
          deliveryAddressLine3: new FormControl(this.OrderRequirements.buyerAddressLine3, [Validators.required, Validators.maxLength(25)]),
          note: new FormControl("", [Validators.required, Validators.maxLength(250)]),
          deliveryLocation: new FormControl("", [Validators.required]),
          quantity: new FormControl("", [Validators.required, Validators.pattern('^[0-9]*$'), Validators.max(100000)]),
          totalPrice: new FormControl("")
        });

      } else {
        this.router.navigate(['error']);
      }

    },
      error => {
        this.router.navigate(['error']);
      });
  }

  getOrderDetails() {
    this.newOrder = this.deliveryDetailsForm.value;
    this.newOrder.totalPrice = this.totalPrice;
    this.newOrder.shopId = this.shopId;
    this.newOrder.buyerUsername = this.buyerUsername;

    let createdDate = new Date();
    this.newOrder.createdDate = formatDate(createdDate, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');

    let dueDate = new Date();
    dueDate.setDate(createdDate.getDate() + this.deliveryDays);
    this.newOrder.dueDate = formatDate(dueDate, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
  }

  postOrderDetails() {
    this.orderService.connectCreateOrderApi(this.newOrder).subscribe(response => {
      let orderCreatingResponse: ResponsePayload;
      orderCreatingResponse = response;

      if (orderCreatingResponse.responseStatus) {
        this.isNotCreate = !orderCreatingResponse.responseStatus;
        this.router.navigate(['user/' + this.buyerUsername + '/orders-dashboard']);
      }
      else {
        this.isNotCreate = !orderCreatingResponse.responseStatus;
      }
    },
      error => {
        this.router.navigate(['error']);
      });
  }

}
