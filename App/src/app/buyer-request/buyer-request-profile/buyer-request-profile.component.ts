import { Component, OnInit } from '@angular/core';
import { BuyerRequestService } from '../../services/buyer-request.service'
import { BuyerRequestProfilePayload } from './buyer-request-profile-payload';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-buyer-request-profile',
  templateUrl: './buyer-request-profile.component.html',
  styleUrls: ['./buyer-request-profile.component.css']
})
export class BuyerRequestProfileComponent implements OnInit {

  buyerRequests: BuyerRequestProfilePayload[];
  usernameFromLocalStorage: string;

  constructor(private buyerRequestService: BuyerRequestService, private router: Router, private localStorageService: LocalStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getActiveBuyerRequestsByUser();
    this.getUsernameFromLocalStorage();
  }

  //Slice the current url and get the username
  getUsernameFromUrl(): string {

    if (this.router.url.endsWith('/profile')) {
      return this.router.url.slice(6, (this.router.url.length - 8));

    } else {
      return this.router.url.slice(6, this.router.url.length);
    }
  }

  getUsernameFromLocalStorage() {

    if (this.authService.isAuthenticated)
      this.usernameFromLocalStorage = this.localStorageService.retrieve('username');
  }

  getActiveBuyerRequestsByUser() {
    this.buyerRequestService.connectActiveBuyerRequestsByUserApi(this.getUsernameFromUrl()).subscribe((data) => {

      if (data != null) {
        this.buyerRequests = data;
      }
    },
      error => {
        this.router.navigate(['error']);
      });

  }

}
