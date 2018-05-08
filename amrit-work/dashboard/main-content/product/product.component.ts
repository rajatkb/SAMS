import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product = new Product('A104', 'Dettol', 10, 'https://www.nestle.in/asset-library/PublishingImages/revamp/brands/pdca/inner_images/1_newmaggipackshot_inner2017.jpg', 'Nestle', 'Alibaba', 'SpaceX', 'Big Bazaar Ltd');

  constructor() { }

  ngOnInit() {
  }

}
