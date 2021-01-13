import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}



// is same user
// is farmer
// isfarmerusername === local storage username
// then show accpt order button
// after confirmation reload the page and start the countdown
