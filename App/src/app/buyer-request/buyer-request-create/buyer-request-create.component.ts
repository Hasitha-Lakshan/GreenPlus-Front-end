import { Component, OnInit } from '@angular/core';
import { BuyerRequestService } from '../../services/buyer-request.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BuyerRequestCreatePayload } from './buyer-request-create-payload';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { ResponsePayload } from 'src/app/shared/response-payload';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-buyer-request-create',
  templateUrl: './buyer-request-create.component.html',
  styleUrls: ['./buyer-request-create.component.css']
})
export class BuyerRequestCreateComponent implements OnInit {

  newBuyerRequestFrom: FormGroup;
  buyerRequest: BuyerRequestCreatePayload;
  datasaved: boolean;
  datanotsaved: boolean;

  constructor(private buyerRequestService: BuyerRequestService, private formbuilder: FormBuilder, private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {

    this.newBuyerRequestFrom = this.formbuilder.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      subCategory: ['', [Validators.required]],
      description: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      expectDays: ['', [Validators.required]],
      location: ['', [Validators.required]],
    });
  }

  clearForm() {
    this.newBuyerRequestFrom.reset();
  }

  get formControls() {
    return this.newBuyerRequestFrom.controls;
  }

  submitNewBuyerRequestData() {

    this.datasaved = false;
    this.datanotsaved = false;
    this.buyerRequest = this.newBuyerRequestFrom.value;

    let createdDate = new Date();
    this.buyerRequest.createdDate = formatDate(createdDate, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    this.buyerRequest.username = this.localStorageService.retrieve('username');
    this.postNewBuyerRequestData(this.buyerRequest);
  }

  postNewBuyerRequestData(newBuyerRequest: BuyerRequestCreatePayload) {
    this.buyerRequestService.connectCreateBuyerRequestApi(newBuyerRequest).subscribe(response => {
      let buyerRequestCreatingResponse: ResponsePayload;
      buyerRequestCreatingResponse = response;

      if (buyerRequestCreatingResponse.responseStatus) {
        this.datasaved = buyerRequestCreatingResponse.responseStatus;
        this.newBuyerRequestFrom.reset();
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
