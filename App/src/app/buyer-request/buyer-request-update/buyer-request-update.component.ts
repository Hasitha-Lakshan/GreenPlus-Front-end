import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponsePayload } from 'src/app/shared/response-payload';
import { LocalStorageService } from 'ngx-webstorage';
import { BuyerRequestService } from '../../services/buyer-request.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { BuyerRequestUpdateDetailsPayload } from './buyer-request-update-details-payload';
import { BuyerRequestUpdatePayload } from './buyer-request-update-payload';

@Component({
  selector: 'app-buyer-request-update',
  templateUrl: './buyer-request-update.component.html',
  styleUrls: ['./buyer-request-update.component.css']
})
export class BuyerRequestUpdateComponent implements OnInit {

  buyerRequestFrom: FormGroup;
  buyerRequest: BuyerRequestUpdateDetailsPayload;
  updatedBuyerRequest: BuyerRequestUpdatePayload;
  datasaved: boolean;
  datanotsaved: boolean;
  username: string;

  constructor(private buyerRequestService: BuyerRequestService, private formbuilder: FormBuilder, private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {

    this.buyerRequestFrom = this.formbuilder.group({
      title: [''],
      category: [''],
      subCategory: [''],
      description: [''],
      unit: [''],
      quantity: [''],
      price: [''],
      expectDays: [''],
      location: [''],
      buyerRequestStatus: ['']
    });

    this.getBuyerRequestDetails();
    this.getUsernameFromLocalStorage();
  }

  getUsernameFromLocalStorage() {
    this.username = this.localStorageService.retrieve('username');
  }

  get formControls() {
    return this.buyerRequestFrom.controls;
  }

  private getBuyerRequestIdFromUrl(): string {
    let url = this.router.url;
    return url.slice(38, url.length);
  }

  getBuyerRequestDetails() {
    this.buyerRequestService.connectBuyerRequestDetailsByBuyerRequestIdApi(this.getBuyerRequestIdFromUrl()).subscribe((data) => {

      if (data != null) {
        this.buyerRequest = data;
        this.buyerRequestFrom = new FormGroup({
          title: new FormControl(this.buyerRequest.title, [Validators.required]),
          category: new FormControl(this.buyerRequest.category, [Validators.required]),
          subCategory: new FormControl(this.buyerRequest.subCategory, [Validators.required]),
          description: new FormControl(this.buyerRequest.description, [Validators.required]),
          unit: new FormControl(this.buyerRequest.unit, [Validators.required]),
          quantity: new FormControl(this.buyerRequest.quantity, [Validators.required]),
          price: new FormControl(this.buyerRequest.price, [Validators.required]),
          expectDays: new FormControl(this.buyerRequest.expectDays, [Validators.required]),
          location: new FormControl(this.buyerRequest.location, [Validators.required]),
          buyerRequestStatus: new FormControl(this.buyerRequest.buyerRequestStatus)
        });

      } else {
        this.router.navigate(['error']);
      }

    },
      error => {
        this.router.navigate(['error']);
      });
  }

  updateBuyerRequestData() {

    this.datasaved = false;
    this.datanotsaved = false;
    this.updatedBuyerRequest = this.buyerRequestFrom.value;
    this.putBuyerRequestData(this.updatedBuyerRequest);
  }

  putBuyerRequestData(updatedBuyerRequest: BuyerRequestUpdatePayload) {
    this.buyerRequestService.connectBuyerRequestUpdateApi(updatedBuyerRequest, this.getBuyerRequestIdFromUrl()).subscribe(response => {
      let buyerRequestCreatingResponse: ResponsePayload;
      buyerRequestCreatingResponse = response;

      if (buyerRequestCreatingResponse.responseStatus) {
        this.datasaved = buyerRequestCreatingResponse.responseStatus;
        this.ngOnInit();
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
