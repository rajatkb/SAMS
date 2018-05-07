import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';
import { HttpClient } from '@angular/common/http';
import { Warehouse } from '../../model/warehouse.model';
import { Outlet } from '../../model/outlet.model';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  serverData:JSON;
  employeeData: JSON;
  addNewProductFormShow:boolean = false;
  rotate:boolean=false;
  isBtnActive:boolean = false;
  selectedRow:number;
  setClickedRow:Function;
  
  outlet:Outlet[]=[
    
      {
        product_id:"101",
        id:"1",
        warehouse_id:"string",
        shelf: true,
        sold:true,
        shelf_count:20,
        sold_count:2
    },
    {
      product_id:"102",
      id:"1",
      warehouse_id:"string",
      shelf: true,
      sold:true,
      shelf_count:20,
      sold_count:2
    },
    {
      product_id:"103",
      id:"1",
      warehouse_id:"string",
      shelf: true,
      sold:true,
      shelf_count:20,
      sold_count:2
  }
    
];

  warehouse: Warehouse[]=[
    {
    id:"a",
    product_id:"101",
    batch_id: "a1",
    barcode:"ghvb",
    sent_to_outlet:true,
    warehouse_count: 200
  
  },
  {
    id:"a",
    product_id:"102",
    batch_id: "a1",
    barcode:"ghvb",
    sent_to_outlet:true,
    warehouse_count: 200
  
  },
  {
    id:"a",
    product_id:"103",
    batch_id: "a1",
    barcode:"ghvb",
    sent_to_outlet:true,
    warehouse_count: 200
  
  }



];
   
   products:Product[] = [{
    
    id:"101",
    name:"maggi",
    description:"lorem ipsum",
    price:12,
    brand_name:"Nestle",
    category_name:"food",
    status: true
   },
   {
    
    id:"102",
    name:"wai wai",
    description:"lorem ipsum",
    price:20,
    brand_name:"Nestle",
    category_name:"food",
    status: true      },
   {
    
    id:"101",
    name:"maggi",
    description:"lorem ipsum",
    price:12,
    brand_name:"Nestle",
    category_name:"food",
    status: true   
   }
   
   

  ];
  
  id:string;
  name:string;
  description:string;
  brand_name:string;
  category_name:string;
  price:number;
  warehouse_count:number;
  shelf_count:number;
  sold_count:number;
  AddedArray: Array<{id:string,name:string,brand_name:string,category_name:string,price:number,description:string}> = [];
  warehouseArray: Array<{w_count:number,s_count:number,sold:number}> = [];
  deletedArray=[];
  fake_productArray=[];
  fake_products=[];
  deletedArray_kaArray=[]

  
  toggleClass(){
      this.isBtnActive = !this.isBtnActive;
  }
  addFieldValue() {
    this.AddedArray.push({id:this.id, name:this.name, brand_name:this.brand_name,category_name:this.category_name,price:this.price,description:this.description});
    this.products.push({id:this.id, name:this.name, brand_name:this.brand_name,category_name:this.category_name,price:this.price,description:this.description,status:false});
    this.fake_products.push({id:this.id, name:this.name, brand_name:this.brand_name,category_name:this.category_name,price:this.price,description:this.description,status:false});

    this.id=null;
    this.name=null;
    this.brand_name=null;
    this.category_name=null;
    this.description=null;
    this.price=null;
}
deleteFieldValue(index) {
    this.deletedArray=this.deletedArray.concat(this.products[index]);
    for(let i=0;i<this.deletedArray.length;i++)
    {
      
        console.log(this.deletedArray[i].id);
        var deleted_product_id=(this.deletedArray[i].id);          

    }
    for(let k=0;k<this.warehouse.length;k++)
    {
      if(this.warehouse[k].product_id==deleted_product_id)
        this.deletedArray=this.deletedArray.concat(this.warehouse[k].warehouse_count);
      else
        this.deletedArray.push(this.warehouse_count=0);
    }
    for(let k=0;k<this.outlet.length;k++)
    {
      if(this.outlet[k].product_id==deleted_product_id){
        this.deletedArray=this.deletedArray.concat(this.outlet[k].shelf_count);
        this.deletedArray=this.deletedArray.concat(this.outlet[k].sold_count);
      }
      else
      {
        this.deletedArray.push(this.shelf_count=0);
        this.deletedArray.push(this.sold_count=0);
      }
        
    }
    this.deletedArray_kaArray.push(this.deletedArray[0]);

    /*this.products.map(item => {
      return {
        id:this.id,
        name: this.name,
        brand_name:this.brand_name,
        category_name:this.category_name,
        price:this.price,
        description:this.description
      }
      }).forEach(item => this.deletedArray.push(item));

      this.warehouse.map(item => {
        return {
          warehouse_count:this.warehouse_count
        }
        }).forEach(item => this.deletedArray.push(item));
        this.outlet.map(item => {
          return {
            shelf_count:this.shelf_count
          }
          }).forEach(item => this.deletedArray.push(item));
          */
  
    this.fake_productArray.splice(index, 1);
}
insert_into_product(index){
  this.products.push(this.deletedArray[index]);
  this.fake_products.push(this.deletedArray[index]);  
  this.deletedArray_kaArray.splice(index, 1);
}
getSum(){
  let sum = 0;
  for(let i = 0; i < this.products.length; i++) {
    
    sum += this.warehouse[i].warehouse_count+this.outlet[i].shelf_count;
  }
  return sum;
}

sayHi() {
  this.httpClient.get('http://127.0.0.1:5002/').subscribe(data => {
    this.serverData = data as JSON;
    console.log(this.serverData);
  })
}

getAllEmployees() {
  this.httpClient.get('http://127.0.0.1:5002/employees').subscribe(data => {
    this.employeeData = data as JSON;
    console.log(this.employeeData);
  })
}
  constructor(private httpClient: HttpClient) {  }

  ngOnInit() {
    
  }

}
