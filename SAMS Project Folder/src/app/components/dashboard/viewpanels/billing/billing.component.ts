import { Component, OnInit } from '@angular/core';
import { Billing } from '../../../../model/billing.model';
import { BillingService } from '../../../../services/billing.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Product } from '../../../../model/product.model';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  constructor(
  				public billingService:BillingService,
  				public flashMessagesService:FlashMessagesService,
  				public productService:ProductService ,
  	) { }

  billingData:Map<string , Billing>;
  billingDataKeys:string[] = [];

  allProducts:Map<string , Product>;
  allProductsKeys:string[] = [];

  ngOnInit() {
  	this.fillBillingData();
  	this.fillProductsData();
  }

  fillBillingData(){
      this.billingService.getProductsBilling().subscribe((val:Map<string,Billing>) => {
      this.billingData = val;
      this.billingDataKeys = Object.keys(this.billingData);
    },error => {
      if(error){
        this.flashMessagesService.show("Server issues, Billing data could not be recovered !!!",{cssClass: 'custom-danger-alert' , timeout:5000});
        console.log(error);
      }
    });
  }
  
  fillProductsData(){
    this.productService.getProducts().subscribe((val:Map<string,Product>) => {
        this.allProducts = val;
        this.allProductsKeys = Object.keys(this.allProducts);
    },error => {
      if(error){
        this.flashMessagesService.show("Server issues, products could not be recovered !!!",{cssClass: 'custom-danger-alert' , timeout:5000});
        console.log(error);
      }
    });
  }

  receiveOrder(key:string){
    this.billingService.receiveOrder(key).subscribe( (val:any) => {
        if(!val.error){
          this.billingData[key].deliveryStatus=true;
          this.flashMessagesService.show("New order received!!!",{cssClass: 'custom-success-alert' , timeout:5000});
        }
        else{
          this.flashMessagesService.show("Server issues, failed to update !!!",{cssClass: 'custom-danger-alert' , timeout:5000});  
        }
    },error => {
      if(error){
        this.flashMessagesService.show("Server issues, items could not be received !!!",{cssClass: 'custom-danger-alert' , timeout:5000});
        console.log(error);
      }
    });
  }

  getKeys(id:string){
  	return Object.keys(this.billingData[id].items);
  }

}
