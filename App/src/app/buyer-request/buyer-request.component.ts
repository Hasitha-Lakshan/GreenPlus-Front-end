import { Component, OnInit } from '@angular/core';
import { BuyerRequestService } from '../services/buyer-request.service'
import { BuyerRequest } from './buyer-request';

@Component({
  selector: 'app-buyer-request',
  templateUrl: './buyer-request.component.html',
  styleUrls: ['./buyer-request.component.css']
})
export class BuyerRequestComponent implements OnInit {

  buyerRequests: BuyerRequest[];

  constructor(private buyerRequestService: BuyerRequestService) { }

  ngOnInit(): void {
    this.getBuyerRequestsPublic();
  }

  getBuyerRequestsPublic() {
    this.buyerRequestService.connectHomeShopsApi().subscribe((data) => {
      this.buyerRequests = data;
    })
  }

}
