import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../model/product.model';
import { ProductService } from '../../../../services/product.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';
import { OutletService } from '../../../../services/outlet.service';
import { Outlet } from '../../../../model/outlet.model';
import { NotificationService } from '../../../../services/notification.service';
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

  productMap:Map<string,Product>;
  keys:string[] = [];

  outletMap:Map<string,Outlet>;

  constructor(public productService:ProductService , 
              public outletService:OutletService,
              public flashMessagesService:FlashMessagesService,
              public nf:NotificationService
              ) { }

  


  ngOnInit() {
    
     this.fillAllData();
     this.nf.getProductNotification().subscribe(val => {
         if(this.productMap !== undefined && this.outletMap !==undefined){
             if(this.productMap[val.data.id] === undefined){
                 this.keys.push(val.data.id);
                 this.outletMap[val.data.id] = {
                   product_id:val.data.id,
                   shelf:0,
                   sold:0,
                   id:0
                 }
              }
             this.productMap[val.data.id]= val.data;
           }
     });
  }

  totalUnits:number =0 ;
  totalShelf:number = 0;
  totalSold:number = 0;

  totalUnit(){
    if(this.outletMap !== undefined){
      Object.keys(this.outletMap).forEach(k => {
        this.totalShelf +=  this.outletMap[k].shelf;
        this.totalSold += this.outletMap[k].sold;
      });
    }
    this.totalUnits = this.totalShelf + this.totalSold;
  }

  fillAllData(){
    this.fillOutletData();
  }

  fillOutletData(){
    this.outletService.getProductsOutlet().subscribe((val:Map<string,Outlet>) => {
      this.outletMap = val;
      this.fillProductsData();
    },error => {
      if(error){
        this.flashMessagesService.show("Server issues, products sales data could not be recovered !!!",{cssClass: 'custom-danger-alert' , timeOut:7000});
        console.log(error);
      }
    });
  }



  fillProductsData(){
    this.productService.getProducts().subscribe((val:Map<string,Product>) => {
      this.productMap = val;
      this.keys = Object.keys(this.productMap);

      this.totalUnit();
    },error => {
      if(error){
        this.flashMessagesService.show("Server issues, products could not be recovered !!!",{cssClass: 'custom-danger-alert' , timeOut:7000});
        console.log(error);
      }
    });
  }




  toggleDelete(key:string , status:number){
    this.productService.updateProductState(key , status==1?true:false).subscribe((res:any) => {
      console.log(res);
      if(res.error == undefined){
        this.productMap[key].status = status;
        this.nf.pushProductNotification(status ==1 ? "Product readded" : "Product deleted" ,this.productMap[key] , ()=>{});
        this.flashMessagesService.show(this.productMap[key].name+" toggled !!",{cssClass: 'custom-success-alert' , timeOut:1000});
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
        this.nf.pushProductNotification("New Product Added" , this.productToAdd , () => {
          this.flashMessagesService.show("New product added !!",{cssClass: 'custom-success-alert' , timeOut:1000});  
          this.productMap[this.productToAdd.id]=Object.assign({},this.productToAdd);
          this.keys.push(this.productToAdd.id);
          form.reset();
        });
        
      }
    },error => {
      if(error){
        this.flashMessagesService.show("Server issues, products could not be added !!!",{cssClass: 'custom-danger-alert' , timeOut:10000});
        console.log(error);
      }
    });    
  }
}
