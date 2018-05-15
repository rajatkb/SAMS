import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  allProducts: object = {
    'A204': new Product('A204', 'Yippee1', "brand1", "category1", "noodles", 10, true, 'https://www.nestle.in/asset-library/PublishingImages/revamp/brands/pdca/inner_images/1_newmaggipackshot_inner2017.jpg'),
    'A205': new Product('A205', 'Yippee2', "brand2", "category2", "noodles", 10, true, 'https://www.nestle.in/asset-library/PublishingImages/revamp/brands/pdca/inner_images/1_newmaggipackshot_inner2017.jpg'),
    'A206': new Product('A206', 'Yippee3', "brand3", "category3", "noodles", 10, true, 'https://www.nestle.in/asset-library/PublishingImages/revamp/brands/pdca/inner_images/1_newmaggipackshot_inner2017.jpg'),
    'A207': new Product('A207', 'Yippee4', "brand4", "category4", "noodles", 10, true, 'https://www.nestle.in/asset-library/PublishingImages/revamp/brands/pdca/inner_images/1_newmaggipackshot_inner2017.jpg'),
    'A208': new Product('A208', 'Yippee5', "brand5", "category5", "noodles", 10, true, 'https://www.nestle.in/asset-library/PublishingImages/revamp/brands/pdca/inner_images/1_newmaggipackshot_inner2017.jpg'),
    'A209': new Product('A209', 'Yippee6', "brand6", "category6", "noodles", 10, false, 'https://www.nestle.in/asset-library/PublishingImages/revamp/brands/pdca/inner_images/1_newmaggipackshot_inner2017.jpg')
  };

  productsSelected:Object[] = [];
  productsYetToSelect:string[] = [];

  totalBill: number = 0;

  constructor() { }

  ngOnInit() {

    for(let product in this.allProducts)
      if(this.allProducts[product]['status'] === true)
        this.productsYetToSelect.push(product);

  }

  addToOrders(form: NgForm) {

    for(let productId of this.productsYetToSelect) 
      if(productId == form.value.order_id) {
        let index = this.productsYetToSelect.indexOf(productId);
        if (index > -1) 
            this.productsYetToSelect.splice(index, 1);
        this.productsSelected.push({
          'id': form.value.order_id,
          'quantity': form.value.order_quantity,
          'status': true,
          'isForSale': 1
        });
        this.totalBill = this.totalBill + (this.allProducts[form.value.order_id])['price'] * form.value.order_quantity;
        form.reset();
      }

  }

  deleteFromOrders(i: any) {
    let temp:string = (this.productsSelected[i])['id'];
    this.totalBill = this.totalBill - (this.allProducts[temp])['price'] * this.productsSelected[i]['quantity'];
    this.productsSelected.splice(i, 1);
    this.productsYetToSelect.push(temp);

  }

  placeDelivery() {
    //console.log(this.productsSelected);
    this.productsSelected.splice(0, this.productsSelected.length);
  }

}
