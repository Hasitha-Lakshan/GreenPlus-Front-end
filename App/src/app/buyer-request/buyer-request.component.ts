import { Component, OnInit } from '@angular/core';
import { BuyerRequestService } from '../services/buyer-request.service'
import { BuyerRequestPayload } from './buyer-request-payload';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-buyer-request',
  templateUrl: './buyer-request.component.html',
  styleUrls: ['./buyer-request.component.css']
})
export class BuyerRequestComponent implements OnInit {

  buyerRequests: BuyerRequestPayload[];
  username: string;

  constructor(private buyerRequestService: BuyerRequestService, private router: Router, private authService: AuthService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.getBuyerRequestsPublic();
    this.getUsername();
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

  getUsername() {
    if (this.authService.isAuthenticated()) {
      this.username = this.localStorageService.retrieve('username');
    }
  }

}
