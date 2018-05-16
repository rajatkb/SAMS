import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Product } from '../model/product.model';

@Injectable()
export class ProductService {

  constructor(public http:HttpClient){}

  getProducts(){
    return this.http.get<Map<string,Product>>('http://127.0.0.1:8008/products');
  }

  createProduct(data:Product){
    return this.http.post('http://127.0.0.1:8008/product',data);
  }

  getProduct(id:string){
    return this.http.get<Product>('http://127.0.0.1:8008/product/'+id);
  }  

  updateProductState(id:string,state:boolean){
    return this.http.put('http://127.0.0.1:8008/product/'+id , {status: state});
  }
}
