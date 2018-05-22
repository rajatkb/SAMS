import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariableService } from '../services/global-variable.service';
import { Outlet } from '../model/outlet.model';

@Injectable()
export class OutletService {

  constructor(public http:HttpClient,
              public globalVaribales:GlobalVariableService
    ) { }

  getProductOutlet(id:string){
  	return this.http.get<Outlet>(this.globalVaribales.API_BASE_URL+'productOutlet/'+id);
  }

  getProductsOutlet(){
  	return this.http.get<Map<string,Outlet>>(this.globalVaribales.API_BASE_URL+'productsOutlet');
  }
  
}
