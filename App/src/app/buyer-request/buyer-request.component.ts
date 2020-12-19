import { Component, OnInit } from '@angular/core';
import { BuyerRequestService } from '../services/buyer-request.service'
import { BuyerRequestPayload } from './buyer-request-payload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buyer-request',
  templateUrl: './buyer-request.component.html',
  styleUrls: ['./buyer-request.component.css']
})
export class BuyerRequestComponent implements OnInit {

  buyerRequests: BuyerRequestPayload[];

  constructor(private buyerRequestService: BuyerRequestService, private router: Router) { }

  ngOnInit(): void {
    this.getBuyerRequestsPublic();
  }

  getBuyerRequestsPublic() {
    this.buyerRequestService.connectAllBuyerRequestsApi().subscribe((data) => {

      if (data != null) {
        this.buyerRequests = data;
      }
    },
      error => {
        this.router.navigate(['error']);
      });

  }

}
