import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Billing } from '../model/billing.model';
import { GlobalVariableService } from '../services/global-variable.service';
import { Observable } from "rxjs/Observable"


@Injectable()
export class BillingService {

  constructor(public http:HttpClient,
              public globalVaribales:GlobalVariableService
    ) { }

  getProductsBilling(){
  	return this.http.get<Map<string,Billing>>(this.globalVaribales.API_BASE_URL+'productsBilling');
  }

  getProductBilling(id:string){
    return this.http.get<Billing>(this.globalVaribales.API_BASE_URL+'productBilling/'+id);
  } 

  createProductsOrderBill(data:Billing){
    return this.http.post(this.globalVaribales.API_BASE_URL+'productBilling/order',data);
  }

  createProductsSaleBill(data:Billing){
    return this.http.post(this.globalVaribales.API_BASE_URL+'productBilling/sale',data);
  }

  receiveOrder(id:string){
   return this.http.put(this.globalVaribales.API_BASE_URL+'productBilling/order/'+id ,{deliveryStatus:true});
  }

}
