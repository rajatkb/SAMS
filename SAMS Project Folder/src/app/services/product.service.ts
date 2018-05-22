import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Product } from '../model/product.model';
import { GlobalVariableService } from '../services/global-variable.service';


@Injectable()
export class ProductService {

  constructor(public http:HttpClient,
              public globalVaribales:GlobalVariableService
    ){}

  getProducts(){
    return this.http.get<Map<string,Product>>(this.globalVaribales.API_BASE_URL+'products');
  }

  createProduct(data:Product){
    return this.http.post(this.globalVaribales.API_BASE_URL+'product',data);
  }

  getProduct(id:string){
    return this.http.get<Product>(this.globalVaribales.API_BASE_URL+'product/'+id);
  }  

  updateProductState(id:string,state:boolean){
    return this.http.put(this.globalVaribales.API_BASE_URL+'product/'+id , {status: state});
  }
}
