import { Component, OnInit } from '@angular/core';
import { DashboardBuyerRequestPayload } from './dashboard-buyer-request-payload';
import { BuyerRequestService } from '../../../services/buyer-request.service'
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ResponsePayload } from 'src/app/shared/response-payload';

@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './buyer-dashboard.component.html',
  styleUrls: ['./buyer-dashboard.component.css']
})
export class BuyerDashboardComponent implements OnInit {

  dashboardBuyerRequests: DashboardBuyerRequestPayload[];
  isBuyerRequestDeleted: boolean;
  isBuyerRequestNotDeleted: boolean;
  buyerRequestId: number;
  BuyerRequestTitle: string;

  constructor(private buyerRequestService: BuyerRequestService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllDashboardBuyerRequests();
  }

  //Slice the current url and get the username
  getUsernameFromUrl(): string {
    return this.router.url.slice(6, (this.router.url.length - 16));
  }

  getAllDashboardBuyerRequests() {
    this.buyerRequestService.connectDashboardBuyerRequestsByUsernameApi(this.getUsernameFromUrl()).subscribe((data) => {

      if (this.authService.validateUserByUsernameFromUrlAndUsernameFromLocalStorage(this.getUsernameFromUrl())) {
        this.dashboardBuyerRequests = data;

      } else {
        this.router.navigate(['error']);
      }

    },
      error => {
        this.router.navigate(['error']);
      });
  }


  getBuyerRequestIdAndTitle(buyerRequestId: number, BuyerRequestTitle: string) {
    this.buyerRequestId = buyerRequestId;
    this.BuyerRequestTitle = BuyerRequestTitle;
  }

  deleteBuyerRequest() {
    this.buyerRequestService.connectDeleteBuyerRequestApi(this.buyerRequestId).subscribe((response) => {

      let buyerRequestDeletingResponse: ResponsePayload;
      buyerRequestDeletingResponse = response;

      if (buyerRequestDeletingResponse.responseStatus) {
        this.isBuyerRequestDeleted = buyerRequestDeletingResponse.responseStatus;
        this.ngOnInit();
      }
      else {
        this.isBuyerRequestNotDeleted = true;
      }
    },
      error => {
        this.isBuyerRequestNotDeleted = true;
      });
  }


}
