import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../../../../../model/product.model';
import { Md5 } from 'ts-md5/dist/md5';
import { ProductService } from '../../../../../services/product.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

  
  productsYetToSelect:string[] = [];
  productsSelected:string[] = [];

  totalBill: number = 0;
  itemsSelected:{ [id: string] : number} = {};

  constructor(public productService:ProductService ,
              public flashMessagesService:FlashMessagesService
    ) { }

  allProducts:Map<string,Product> = undefined;
  keys:string[] = [];

  ngOnInit() {
    this.populateDropdown();
  }

  populateDropdown() {

      this.productService.getProducts().subscribe((val:Map<string,Product>) => {
      this.allProducts = val;
      this.keys = Object.keys(this.allProducts);
      this.keys.forEach(key => {
        this.allProducts[key].status = this.allProducts[key].status == 1 ? true:false; 
        if(this.allProducts[key].status)
          this.productsYetToSelect.push(key);
      });
    },error => {
      if(error){
        this.flashMessagesService.show("Server issues, products could not be recovered !!!",{cssClass: 'custom-danger-alert' , timeout:5000});
        console.log(error);
      }
    });

  }

  
  order_id_index:number=0;
  quantity:number=0;
  addToOrders(form: NgForm) {

    let quantity = this.quantity;
    if(quantity > 1){
      let index = this.order_id_index;
      let id = this.productsYetToSelect[index];
      console.log(index , id );
      this.totalBill = this.totalBill + (this.allProducts[id])['price'] * quantity;
      this.productsSelected.push(id);
      this.itemsSelected[id] = quantity;
      this.productsYetToSelect.splice(index, 1);
      this.order_id_index = 0;
      this.quantity = 0;
    }else{
       this.flashMessagesService.show("No item of 0 quantity allowed !!",{cssClass: 'custom-danger-alert' , timeout:5000});
    }
  }


  deleteFromOrders(i: any) {
    let temp:string = (this.productsSelected[i]); 
    this.totalBill = this.totalBill - (this.allProducts[temp])['price'] * this.itemsSelected[temp];
    this.productsSelected.splice(i, 1);
    this.productsYetToSelect.push(temp);
  }



  placeOrder() {
      if(Object.keys(this.itemsSelected).length ===0 ){
        this.flashMessagesService.show("Nothing to order!!",{cssClass: 'custom-danger-alert' , timeout:5000});
      }else{
          let time = new Date();
          let transactionData:Object = {};
          transactionData['date'] = time.toISOString().substring(0, 10);
          transactionData['time'] = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
          transactionData['category'] = 2;
          transactionData['deliveryStatus'] = false;
          transactionData['items'] = this.itemsSelected;
          transactionData['transactionId'] = Md5.hashStr((transactionData).toString());
          
          this.itemsSelected = {};
          this.productsYetToSelect = Object.keys(this.allProducts);
          this.productsSelected=[];
          this.totalBill = 0;  
      }
  }
}
