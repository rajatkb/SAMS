import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../../models/product.model';
import {Md5} from 'ts-md5/dist/md5';

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

  transactionData:{[key: string] : any} = {};
  productsYetToSelect:string[] = [];
  productsSelected:string[] = [];

  totalBill: number = 0;
  itemsSelected:{ [id: string] : number} = {};

  constructor() { }

  ngOnInit() {
    this.populateDropdown();
  }

  populateDropdown() {

    this.productsYetToSelect = [];
    for(let product in this.allProducts)
      if(this.allProducts[product]['status'] === true)
        this.productsYetToSelect.push(product);

  }

  addToOrders(form: NgForm) {

    let id = form.value.order_id;
    let quantity = form.value.order_quantity;
    
    for(let productId of this.productsYetToSelect) 
      if(productId == id) {

        let index = this.productsYetToSelect.indexOf(productId);
        if (index > -1) 
            this.productsYetToSelect.splice(index, 1);
        this.itemsSelected[id] = quantity;
        this.productsSelected.push(id);
        this.totalBill = this.totalBill + (this.allProducts[id])['price'] * quantity;
        form.reset();
      
      }
  
  }

  deleteFromOrders(i: any) {
    let temp:string = (this.productsSelected[i]); 
    this.totalBill = this.totalBill - (this.allProducts[temp])['price'] * this.itemsSelected[temp];
    this.productsSelected.splice(i, 1);
    this.productsYetToSelect.push(temp);

  }

  placeDelivery() {
    
    let time = new Date();
    this.transactionData['date'] = time.toISOString().substring(0, 10);
    this.transactionData['time'] = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    this.transactionData['category'] = 1;
    this.transactionData['deliveryStatus'] = true;
    this.transactionData['items'] = this.itemsSelected;
    this.transactionData['transactionId'] = Md5.hashStr((this.transactionData).toString());
    this.itemsSelected = {};
    this.populateDropdown();
    this.productsSelected.splice(0, this.productsSelected.length);
    this.totalBill = 0;
  
  }

}
