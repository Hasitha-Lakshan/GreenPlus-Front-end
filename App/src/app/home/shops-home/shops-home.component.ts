import { Component, OnInit } from '@angular/core';
import { ShopsPublicService } from '../../services/shops-public.service'
import { Shop } from './shop';

@Component({
  selector: 'app-shops-home',
  templateUrl: './shops-home.component.html',
  styleUrls: ['./shops-home.component.css']
})
export class ShopsHomeComponent implements OnInit {

  private shops: Shop[];

  constructor(private shopsPublicService: ShopsPublicService) { }

  ngOnInit(): void {

    this.getShops();
  }

  getShops() {
    this.shopsPublicService.connectShopsApi().subscribe((data) => {
      this.shops = data;
      console.log(data);
    });
  }

}
