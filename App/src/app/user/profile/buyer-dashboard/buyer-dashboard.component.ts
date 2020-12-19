import { Component, OnInit } from '@angular/core';
import { DashboardBuyerRequest } from './dashboard-buyer-request';
import { BuyerRequestService } from '../../../services/buyer-request.service'
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './buyer-dashboard.component.html',
  styleUrls: ['./buyer-dashboard.component.css']
})
export class BuyerDashboardComponent implements OnInit {

  dashboardBuyerRequests: DashboardBuyerRequest[];

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

      if (this.authService.validateUserByUsernameFromUrlAndLocalStorageUsingUserId(this.getUsernameFromUrl())) {
        this.dashboardBuyerRequests = data;

      } else {
        this.router.navigate(['error']);
      }

    },
      error => {
        this.router.navigate(['error']);
      });
  }

}
