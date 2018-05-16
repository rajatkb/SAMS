import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../model/product.model';
import { ProductService } from '../../../../services/product.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  productToAdd:Product = {
    brand_name:"",
    category_name:"",
    id:"",
    name:"",
    description:"",
    price:0,
    picture_url:"",
    status:true,
  };

  productMap:Map<string,Product> = undefined;
  keys:string[] = [];

  constructor(public productService:ProductService , 
              public flashMessagesService:FlashMessagesService
              ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((val:Map<string,Product>) => {
      this.productMap = val;
      this.keys = Object.keys(this.productMap);
      this.keys.forEach(key => {
      this.productMap[key].status = this.productMap[key].status == 1 ? true:false; 
      });
    },error => {
      if(error){
        this.flashMessagesService.show("Server issues, products could not be recovered !!!",{cssClass: 'custom-danger-alert' , timeOut:7000});
        console.log(error);
      }
    });

    ///
    // listen for dispatched notification on existing entities
    ///
  }

  toggleDelete(key:string){
    this.productService.updateProductState(key , !this.productMap[key].status).subscribe((res:any) => {
      console.log(res);
      if(res.error == undefined){
        this.flashMessagesService.show(this.productMap[key].name+" toggled !!",{cssClass: 'custom-success-alert' , timeOut:1000});
        // this part can be handled in notifcation handler
        this.productMap[key].status = !this.productMap[key].status;
      }
    },error => {
      if(error){
        this.flashMessagesService.show("Server issues, product could not be deleted !!!",{cssClass: 'custom-danger-alert' , timeOut:10000});
        console.log(error);
      }
    });
     
  }

  addFieldValue(form: NgForm){
    this.productService.createProduct(this.productToAdd).subscribe((res:any) => {
      // console.log(res);      
      if(res.error === undefined){
        this.flashMessagesService.show("New product added !!",{cssClass: 'custom-success-alert' , timeOut:1000});
        //
        // Notify the firebase system
        //
        // the below part can be handled by the notification system
        this.productMap[this.productToAdd.id]=Object.assign({},this.productToAdd);
        this.keys.push(this.productToAdd.id);
        form.reset();
      }
    },error => {
      if(error){
        this.flashMessagesService.show("Server issues, products could not be added !!!",{cssClass: 'custom-danger-alert' , timeOut:10000});
        console.log(error);
      }
    });

    
  }
}
