import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';
import { Brand } from '../../model/brand.model';
import { Category } from '../../model/category.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  addNewProductFormShow:boolean = false;
  rotate:boolean=false;
  isBtnActive:boolean = false;
  selectedRow:Number;
  setClickedRow:Function;
  
  
   
   products:Product[] = [{
    brand_id:"a101", 
    category_id:"a",
    id:"a101",
    name:"maggi",
    description:"lorem ipsum",
    price:12,
    w_count:200,
    s_count:200,
    sold:200    
   },
   {
    brand_id:"a102", 
    category_id:"b",
    id:"a102",
    name:"wai wai",
    description:"lorem ipsum",
    price:20,
    w_count:200,
    s_count:200,
    sold:200       },
   {
    brand_id:"a103", 
    category_id:"a",
    id:"a101",
    name:"maggi",
    description:"lorem ipsum",
    price:12,
    w_count:200,
    s_count:200,
    sold:200    
   },
   {
    brand_id:"a103", 
    category_id:"a",
    id:"a101",
    name:"maggi",
    description:"lorem ipsum",
    price:12,
    w_count:200,
    s_count:200,
    sold:200    
   },
   {
    brand_id:"a103", 
    category_id:"a",
    id:"a101",
    name:"maggi",
    description:"lorem ipsum",
    price:12,
    w_count:200,
    s_count:200,
    sold:200    
   },
   {
    brand_id:"a103", 
    category_id:"a",
    id:"a101",
    name:"maggi",
    description:"lorem ipsum",
    price:12,
    w_count:200,
    s_count:200,
    sold:200    
   },
   {
    brand_id:"a103", 
    category_id:"a",
    id:"a101",
    name:"maggi",
    description:"lorem ipsum",
    price:12,
    w_count:200,
    s_count:200,
    sold:200    
   }
   

  ];
  brand_id:string; 
  category_id:string;
  id:string;
  name:string;
  description:string;
  price:Number;
  deletedArray: Array<{id:string,name:string,brand_id:string,category_id:string,price:number,description:string,w_count:number,s_count:number,sold:number}> = [];
  
  
  toggleClass(){
      this.isBtnActive = !this.isBtnActive;
  }
  addFieldValue() {
    this.products.push({id:this.id, name:this.name, brand_id:this.brand_id,category_id:this.category_id,price:200,description:this.description,w_count:200,s_count:200,sold:20});
    this.id=null;
    this.name=null;
    this.brand_id=null;
    this.category_id=null;
    this.description=null;
    this.price=null;
}
deleteFieldValue(index) {
    this.deletedArray=this.deletedArray.concat(this.products[index]);
    this.products.splice(index, 1);
   
}
insert_into_product(index){
  this.products.push(this.deletedArray[index]);
  this.deletedArray.splice(index, 1);
}
getSum(){
  let sum = 0;
  for(let i = 0; i < this.products.length; i++) {
    
    sum += this.products[i].w_count+this.products[i].s_count;
  }
  return sum;
}


  constructor() {  }

  ngOnInit() {
    
  }

}
