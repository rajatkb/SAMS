import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../../../../../model/product.model';
import { Md5 } from 'ts-md5/dist/md5';
import { ProductService } from '../../../../../services/product.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BillingService } from '../../../../../services/billing.service';
import { Billing } from '../../../../../model/billing.model';
import { OutletService } from '../../../../../services/outlet.service';
import { Outlet } from '../../../../../model/outlet.model';


@Component({
  selector: 'app-place-delivery',
  templateUrl: './place-delivery.component.html',
  styleUrls: ['./place-delivery.component.css']
})
export class PlaceDeliveryComponent implements OnInit {

  productsYetToSelect:string[] = [];
  productsSelected:string[] = [];

  outletMap:Map<string,Outlet>;

  totalBill: number = 0;
  itemsSelected:{ [id: string] : number} = {};

  constructor(public productService:ProductService ,
              public flashMessagesService:FlashMessagesService,
              public billingService:BillingService,
              public outletService:OutletService,
    ) { }

  allProducts:Map<string,Product> = undefined;
  keys:string[] = [];

  ngOnInit() {
    this.populateAllData();
  }

  populateAllData(){
    this.fillOutletData();
  };

  populateDropdown() {

      this.productService.getProducts().subscribe((val:Map<string,Product>) => {
      this.allProducts = val;
      this.keys = Object.keys(this.allProducts);
      this.keys.forEach(key => {
        this.allProducts[key].status = this.allProducts[key].status == 1 ? true:false; 
        if(this.allProducts[key].status && this.outletMap[key].shelf > 0)
          this.productsYetToSelect.push(key);
      });
    },error => {
      if(error){
        this.flashMessagesService.show("Server issues, products could not be recovered !!!",{cssClass: 'custom-danger-alert' , timeout:5000});
        console.log(error);
      }
    });

  }

  fillOutletData(){
    this.outletService.getProductsOutlet().subscribe((val:Map<string,Outlet>) => {
      this.outletMap = val;
      this.populateDropdown();
    },error => {
      if(error){
        this.flashMessagesService.show("Server issues, product sales data could not be recovered !!!",{cssClass: 'custom-danger-alert' , timeOut:7000});
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

      this.outletService.getProductOutlet(id).subscribe(val => {
        if(val.shelf >= quantity){
            this.totalBill = this.totalBill + (this.allProducts[id])['price'] * quantity;
            this.productsSelected.push(id);
            this.itemsSelected[id] = quantity;
            this.productsYetToSelect.splice(index, 1);
            this.order_id_index = 0;
            this.quantity = 0;
        }else{
          this.flashMessagesService.show("The shop ran out of the product, need to order more!!! Available :"+val.shelf,{cssClass: 'custom-danger-alert' , timeout:5000});            
          
          // running out of notification

        }
      },err => {
        this.flashMessagesService.show("Server issue, cant get updated shelf values of item!!",{cssClass: 'custom-danger-alert' , timeout:5000});
      });
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
          let transactionData:Billing = {
            date : time.toISOString().substring(0, 10),
            time : time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds(),
            category : 1,
            deliveryStatus : true,
            items : this.itemsSelected,
            totalCost : this.totalBill,
          };
          transactionData.transactionId = Md5.hashStr(JSON.stringify(transactionData)).toString();
          this.billingService.createProductsSaleBill(transactionData).subscribe((res:any) =>{
             if(res.error === undefined){
              this.flashMessagesService.show("Bill generated !!",{cssClass: 'custom-success-alert' , timeOut:1000});
              //
              // Notify the firebase system
              //
              // the below part can be handled by the notification system
              this.itemsSelected = {};
              this.productsYetToSelect = Object.keys(this.allProducts);
              this.productsSelected=[];
              this.totalBill = 0;              
            }
          },error => {
              if(error){
                this.flashMessagesService.show("Server issues, products could not be added !!!",{cssClass: 'custom-danger-alert' , timeOut:10000});
                console.log(error);
              }
          });
  
      }
  }

}
