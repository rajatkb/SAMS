import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  productsOrdered: Order[] = [];

  productsNotOrdered: Order[] = [ 
	  new Order('A104', 'Yippee', 10, 0, 'https://www.nestle.in/asset-library/PublishingImages/revamp/brands/pdca/inner_images/1_newmaggipackshot_inner2017.jpg'), 
	  new Order('A105', 'Yippee', 10, 0, 'https://www.nestle.in/asset-library/PublishingImages/revamp/brands/pdca/inner_images/1_newmaggipackshot_inner2017.jpg'), 
	  new Order('A106', 'Yippee', 10, 0, 'https://www.nestle.in/asset-library/PublishingImages/revamp/brands/pdca/inner_images/1_newmaggipackshot_inner2017.jpg'), 
	  new Order('A107', 'Yippee', 10, 0, 'https://www.nestle.in/asset-library/PublishingImages/revamp/brands/pdca/inner_images/1_newmaggipackshot_inner2017.jpg'), 
	  new Order('A108', 'Yippee', 10, 0, 'https://www.nestle.in/asset-library/PublishingImages/revamp/brands/pdca/inner_images/1_newmaggipackshot_inner2017.jpg') 
  ];

  totalBill: number = 0;

  constructor() { }

  ngOnInit() {
  }

  addToOrders(form: NgForm) {

    for(let product of this.productsNotOrdered) 
      if(product.productId == form.value.order_id) {
        let index = this.productsNotOrdered.indexOf(product);
        if (index > -1) {
            this.productsNotOrdered.splice(index, 1);
        }
        product.productQuantity = form.value.order_quantity; 
        this.productsOrdered.push(product);
        this.totalBill = this.totalBill + product.productPrice * product.productQuantity;
      }

  }

  deleteFromOrders(i: any) {
    let temp: Order = this.productsOrdered[i];
    this.productsNotOrdered.push(temp);
    this.productsOrdered.splice(i, i+1);

  }

  placeDelivery() {
    this.productsOrdered.splice(0, this.productsOrdered.length);
  }
}
